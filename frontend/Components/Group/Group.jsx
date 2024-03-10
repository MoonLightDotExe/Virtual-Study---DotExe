import React, { useState, useEffect } from 'react';
import './Group.css'
import Message from '../Message/Message';
import axios from 'axios'
import io from 'socket.io-client';
import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

let selectedGroup = ''
let grpName = ''
let myGrps

const Group = () => {
    const [myGroups, setMyGroups] = useState([])
    const [myMessages, setMyMessages] = useState([])
    // const [selectedGroup, setSelectedGroup] = useState('');
    const [messageText, setMessageText] = useState('')
    const fetchGroups = async () => {
        const { data } = await axios.post('http://localhost:3000/api/groups/get_my_groups', { user_id: localStorage.getItem('user_id') })
        setMyGroups(() => { return data.data.groups })
        myGrps = data.data.groups
    }
    useEffect(() => {
        fetchGroups()
        const socket = io('http://127.0.0.1:3001');
        // Listening for 'connect' event
        socket.on('connect', () => {
            socket.emit("SET_ID", localStorage.getItem('user_id'))
            console.log('Connected to server');
        });

        //Listen for incoming messages
        socket.on('NEW_MESSAGE', (data) => {
            // console.log(data.group_id)
            console.log(selectedGroup)
            if (selectedGroup == data.group_id) {
                console.log("hi")
                setMyMessages(prevMessages => [...prevMessages, data.message]);
            }
        })

        eventEmitter.on("SEND_MSG", (message) => {
            console.log(myGrps)
            let members, username;
            for (let i = 0; i < myGrps.length; i++) {
                if (myGrps[i]._id === selectedGroup) {
                    members = myGrps[i].members
                }
            }
            const user_id = localStorage.getItem('user_id')
            for (let i = 0; i < members.length; i++) {
                if (members[i]._id == user_id) {
                    username = members[i].name
                }
            }
            socket.emit("NEW_MESSAGE", {
                user_id,
                username,
                group_id: selectedGroup,
                members,
                message
            })
        })

        // Listening for 'disconnect' event
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Clean up function to disconnect the socket when component unmounts
        return () => {
            socket.disconnect(localStorage.getItem('user_id'));
        };
    }, []);

    const handleGroupSelect = async (group) => {
        console.log(group._id)
        // setSelectedGroup(() => { return group._id });
        selectedGroup = group._id
        grpName = group.name
        const { data } = await axios.post('http://localhost:3000/api/groups/get_group_messages', { group_id: group._id })
        setMyMessages(data.data)
        console.log(data.data)
    };

    const handleMessageSend = () => {
        eventEmitter.emit("SEND_MSG", messageText)
        setMessageText('')
    };

    return (
        <div className="group-container">
            <div className="group-list">
                <h2>Groups</h2>
                <ul>
                    {myGroups && myGroups.map((group, index) => (
                        <li key={index} onClick={() => handleGroupSelect(group)}>
                            {group.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="message-container">
                {myMessages && <h2>{grpName}</h2>}
                <div className="messages">
                    {myMessages && myMessages.map((item, index) => { return <Message key={index} sender={item.sender._id == localStorage.getItem('user_id') ? "Me" : item.sender.name} text={item.content} /> })}
                </div>
                {selectedGroup &&
                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <button onClick={handleMessageSend}>Send</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Group;
