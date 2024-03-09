import React from 'react'

import { MdCheckCircle, MdSettings } from 'react-icons/md'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'

import './Features.css'

function Features() {
  return (
    <>
      <div className='features-primary'>Features</div>
      <div className='features'>
        <div className='list list-blue'>
          <List spacing={10}>
            <ListItem>
              <ListIcon
                as={MdCheckCircle}
                color='white'
              />
              Real-Time Calling
            </ListItem>
            <ListItem>
              <ListIcon
                as={MdCheckCircle}
                color='white'
              />
              Notes Sharing
            </ListItem>
            <ListItem>
              <ListIcon
                as={MdCheckCircle}
                color='white'
              />
              Collaborative Note Making
            </ListItem>
          </List>
        </div>
        <div className='list list-white'>
          <List spacing={10}>
            <ListItem>
              <ListIcon
                as={MdCheckCircle}
                color='blue.500'
                size={10}
              />
              Sharing Space with like minded people
            </ListItem>
            <ListItem>
              <ListIcon
                as={MdCheckCircle}
                color='blue.500'
                size={10}
              />
              Study Plan Generation
            </ListItem>
            <ListItem>
              <ListIcon
                as={MdCheckCircle}
                color='blue.500'
                size={10}
              />
              Group Discussions
            </ListItem>
          </List>
        </div>
      </div>
    </>
  )
}

export default Features
