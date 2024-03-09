import React, { useContext, useState } from 'react'

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
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import globalContext from '../../Context/globalContext'
import './Profile.css'

function Profile() {
  const { filterProfile } = useContext(globalContext)
  const [select, setSelect] = useState(0)
  const [sel, setSel] = useState('SP')
  const [input, setInput] = useState()
  const handleChange = (e) => {
    setSelect(e.target.value)
    console.log(select)
  }
  const handleChange2 = (e) => {
    console.log(e)
    setSel(e.target.value)
  }
  const handleSubmit = async () => {
    try {
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
      console.log(data)
      navigate('/waiting')
    } catch (err) {
      console.log(err)
    }
  }
  const handleClick = async () => {
    try {
      await filterProfile(select)
    } catch (err) {
      console.log(err)
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className='profile-container'>
        <div className='profile-header'>Your Space</div>
        <div className='profile-suggestions'>
          <Select onChange={handleChange}>
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
          <Button onClick={handleClick}>Submit</Button>
        </div>

        <button
          className='buttons2'
          onClick={onOpen}
        >
          New Room
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
                    value='SP'
                    onChange={handleChange2}
                  >
                    Student Preference
                  </option>
                  <option
                    value='S'
                    onChange={handleChange2}
                  >
                    Subject
                  </option>
                  <option
                    value='T'
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
                  onChange={handleChange}
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
