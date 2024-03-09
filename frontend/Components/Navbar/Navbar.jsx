import React, { useContext } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import globalContext from '../../Context/globalContext'

import logo from '/assets/logo.png'
import './Navbar.css'

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(globalContext)
  const handleLogout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    setIsLoggedIn(false)
  }
  return (
    <>
      <nav className='navbar'>
        <Link
          to='/'
          className='logo'
        >
          <img
            src={logo}
            height='50'
            width='100'
          />
        </Link>
        <div className='nav'>
          <a
            href=''
            className='text-black'
          >
            Contact Us
          </a>
          {!isLoggedIn && (
            <>
              <Link to='/login'>
                <Button
                  colorScheme='twitter'
                  variant='outline'
                  size='lg'
                >
                  Log In
                </Button>
              </Link>
              <Link to='/signUp'>
                <Button
                  colorScheme='twitter'
                  variant='solid'
                  size='lg'
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to='/profile'>
                <Button
                  colorScheme='twitter'
                  variant='solid'
                  size='lg'
                >
                  My Profile
                </Button>
              </Link>

              <Button
                colorScheme='twitter'
                variant='solid'
                size='lg'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
