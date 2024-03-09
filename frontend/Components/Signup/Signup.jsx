import React from 'react'
import { useState, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useToast, Box } from '@chakra-ui/react'
import globalContext from '../../Context/globalContext'

import auth from '/assets/auth.avif'
import './Signup.css'

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { register } = useContext(globalContext)

  const toast = useToast()
  const navigate = useNavigate()

  const [type, setType] = useState(0)

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    const data = await register(form)
    if (data.success) {
      toast({
        position: 'top-right',
        render: () => (
          <Box
            color='white'
            p={3}
            bg='green.500'
          >
            Success! User created Successfully! Please Log in!
          </Box>
        ),
      })
      navigate('/login')
    } else {
      toast({
        position: 'top-right',
        render: () => (
          <Box
            color='white'
            p={3}
            bg='red.500'
          >
            Error! User Already Exists!
          </Box>
        ),
      })
    }
  }
  return (
    <div>
      <div className='l-SignUp'>
        <div className='l-SignUp-image'>
          <img
            src={auth}
            alt='auth_image'
            className='l-SignUp-image-abs'
          />
        </div>
        <div className='l-SignUp-desc'>
          <div className='l-SignUp-desc-head'>
            <span className='l-SignUp-primary'>Sign Up for Your Account</span>
            <span className='l-SignUp-secondary'>Let's get you an account</span>
          </div>
          <div className='l-SignUp-inputs'>
            <div className='l-SignUp-element'>
              <label>Name</label>
              <input
                type='text'
                className='l-SignUp-element-input'
                id='name'
                onChange={onChange}
              />
            </div>
            <div className='l-SignUp-element'>
              <label>Email</label>
              <input
                type='email'
                className='l-SignUp-element-input'
                id='email'
                onChange={onChange}
              />
            </div>
            <div className='l-SignUp-element'>
              <label>Password</label>
              <input
                type='password'
                className='l-SignUp-element-input'
                id='password'
                onChange={onChange}
              />
            </div>

            <button
              className='btn2 btn-primary'
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div className='l-SignUp-footer'>
            Already have an account?{' '}
            <Link
              to='/login'
              style={{ color: 'blue' }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
