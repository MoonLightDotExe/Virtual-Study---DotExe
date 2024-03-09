import React from 'react'

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast, Box } from '@chakra-ui/react'
import globalContext from '../../Context/globalContext'

import auth from '/assets/auth.avif'

import './Login.css'

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [type, setType] = useState(0)

  const toast = useToast()

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const navigate = useNavigate()

  const { login, isLoggedIn } = useContext(globalContext)

  const handleSubmit = async (e) => {
    console.log(form)
    const data = await login(form)

    console.log(data)
    if (data.success) {
      navigate('/')
    } else {
      toast({
        position: 'top-right',
        render: () => (
          <Box
            color='white'
            p={3}
            bg='red.500'
          >
            Error! Please Check your Credentials!
          </Box>
        ),
      })
    }
  }

  // const handleSubmit = (e) => {}
  return (
    <div className='l-login'>
      <div className='l-login-image'>
        <img
          src={auth}
          alt='auth_image'
          className='l-login-image-abs'
        />
      </div>
      <div className='l-login-desc'>
        <div className='l-login-desc-head'>
          <span className='l-login-primary'>Log In To Your Account</span>
          <span className='l-login-secondary'>
            Let's get you into your account
          </span>
        </div>
        <div className='l-login-inputs'>
          <div className='l-login-element'>
            <label>Email</label>
            <input
              type='email'
              className='l-login-element-input'
              id='email'
              onChange={onChange}
            />
          </div>
          <div className='l-login-element'>
            <label>Password</label>
            <input
              type='password'
              className='l-login-element-input'
              id='password'
              onChange={onChange}
            />
          </div>

          <button
            className='btn2 btn-primary'
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className='l-login-footer'>
          Don't have an account?{' '}
          <Link
            to='/signUp'
            style={{ color: 'blue' }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
