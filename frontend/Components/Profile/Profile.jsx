import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  Input,
  Stack,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import globalContext from '../../Context/globalContext'
import './Profile.css'
import Group from '../Group/Group'
import axios from 'axios'

function Profile() {
  const { filterProfile, queue, setQueue, setRoom_id, setTrans, trans } =
    useContext(globalContext)
  const [select, setSelect] = useState(0)
  const [sel, setSel] = useState('SP')
  const [input, setInput] = useState()
  const [makingNewGroup, setMakingNewGroup] = useState('')
  const handleChange = (e) => {
    setSelect(e.target.value)

    console.log(select)
  }
  const handleInput = (e) => {
    setInput(e.target.value)
  }
  const handleChange2 = (e) => {
    console.log(e)
    setSel(e.target.value)
  }
  const handleTranscript = async (e) => {
    try {
      const response = await fetch(
        'https://api.digitalsamba.com/api/v1/recordings',
        {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer OGE5MzEwMmMtZGNlZi00MDNhLTg0ZmYtMjFiZWJmMzdhZjFjOkYyaDNOb3NlczR2SU9kQWZUS2pQaTRuRDY0R1BWYVJmNzdLY1R6MG5HaWVLSjJ3UWpFb3h0eFFvOG9idE5oc0U=',
          },
        }
      )
      const data = await response.json()
      console.log(data.data[0].id)
      const response2 = await fetch(
        `http://127.0.0.1:5000/get_audio_link_and_transcript/${data.data[0].id}`,
        {
          method: 'GET',
        }
      )
      const data2 = await response2.json()
      if (data2) {
        setTrans(data2.transcript)
        navigate('/transcript')
      }
      console.log(data2)
    } catch (err) {
      console.log(err)
    }
  }
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      //create new group
      const newGrp = await axios.post('http://localhost:3000/api/groups/create',
        { name: input, user_id: localStorage.getItem('user_id') })

      setMakingNewGroup(newGrp.data)

      const body = new URLSearchParams()
      body.append('privacy', 'public')
      const response = await fetch(
        'https://api.digitalsamba.com/api/v1/rooms',
        {
          method: 'POST',
          body: body,
          headers: {
            Authorization:
              'Bearer OGE5MzEwMmMtZGNlZi00MDNhLTg0ZmYtMjFiZWJmMzdhZjFjOkYyaDNOb3NlczR2SU9kQWZUS2pQaTRuRDY0R1BWYVJmNzdLY1R6MG5HaWVLSjJ3UWpFb3h0eFFvOG9idE5oc0U=',
          },
        }
      )
      const data = await response.json()
      setRoom_id(data.room_url)
      const bodyParams = new URLSearchParams()
      bodyParams.append('user_id', localStorage.getItem('user_id'))
      bodyParams.append('room_id', data.rool_url)
      bodyParams.append('preference', sel)
      bodyParams.append('interest', input)

      const resp2 = await fetch('http://localhost:3000/api/utils/addRoom', {
        method: 'POST',
        body: bodyParams,
      })
      const data2 = await resp2.json()
      console.log(data2)
      navigate('/call')
    } catch (err) {
      console.log(err)
    }
  }
  const [chats, setChats] = useState([])
  const handleClick = async () => {
    try {
      const data = await filterProfile(select)
      setChats(data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleJoin = async (val) => {
    setRoom_id(val)
    navigate('/call')
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className='profile-container'>
        <div className='profile-header'>Your Space</div>
        <div className='profile-suggestions'>
          <div
            style={{
              width: '300px',
            }}
          >
            <Select
              size='md'
              onChange={handleChange}
            >
              <option
                value='1'
                onChange={handleChange}
              >
                All
              </option>
              <option
                value='2'
                onChange={handleChange}
              >
                Explore
              </option>
              <option
                value='3'
                onChange={handleChange}
              >
                Groups
              </option>
              <option
                value='4'
                onChange={handleChange}
              >
                DMs
              </option>
            </Select>
          </div>
          <Button
            variant='solid'
            colorScheme='twitter'
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
        {select == 3 && <Group />}
        <div className='profile-display'>
          {chats.map((chat, index) => {
            return (
              <div
                className='card-custom-profile'
                key={index}
              >
                <Card>
                  <CardBody>
                    <Flex>
                      <Box>
                        <Heading
                          size='xs'
                          textTransform='uppercase'
                        >
                          {chat.preference || chat}
                        </Heading>
                        <Text
                          pt='2'
                          fontSize='sm'
                        >
                          {chat.interest || chat}
                        </Text>
                      </Box>
                      <Spacer />
                      {chat.room_id && (
                        <Button
                          colorScheme='green'
                          onClick={() => handleJoin(chat.room_id)}
                        >
                          JOIN
                        </Button>
                      )}
                    </Flex>
                  </CardBody>
                </Card>
              </div>
            )
          })}
        </div>

        <button
          className='buttons2'
          onClick={() => {
            onOpen()
            //create new room
          }}
        >
          New Room
        </button>

        <button
          className='buttons3'
          onClick={handleTranscript}
        >
          Get recent transcript
        </button>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <label className='label-form'>Select Type:</label>
                <Select onChange={handleChange2}>
                  <option
                    value='Student Preference'
                    onChange={handleChange2}
                  >
                    Student Preference
                  </option>
                  <option
                    value='Subject'
                    onChange={handleChange2}
                  >
                    Subject
                  </option>
                  <option
                    value='Topic'
                    onChange={handleChange2}
                  >
                    Topic
                  </option>
                </Select>
              </Stack>
              <Stack>
                <label className='label-form'>Enter Interests:</label>
                <Input
                  value={input}
                  onChange={handleInput}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                colorScheme='green'
                mr={3}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default Profile
