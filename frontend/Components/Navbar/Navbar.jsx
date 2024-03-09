import React from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'

import logo from '/assets/logo.png'
import './Navbar.css'

function Navbar() {
  return (
    <>
      <nav class='navbar'>
        <div class='logo'>
          <img
            src={logo}
            height='50'
            width='100'
          />
        </div>
        <div class='nav'>
          <a
            href=''
            className='text-black'
          >
            Contact Us
          </a>
          <Button
            colorScheme='twitter'
            variant='outline'
            size='lg'
          >
            Log In
          </Button>
          <Button
            colorScheme='twitter'
            variant='solid'
            size='lg'
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
