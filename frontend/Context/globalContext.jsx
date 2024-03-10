import { createContext, useState } from 'react'
import axios from 'axios'

const globalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [queue, setQueue] = useState()
  const [room_id, setRoom_id] = useState()
  const register = async (body) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (data.success) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const login = async (body) => {
    try {
      console.log(body)
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      // console.log("sUcc" + data.success)
      if (data.success) {
        setIsLoggedIn(true)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user_id', data.data.id)
      } else {
        setIsLoggedIn(false)
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const filterProfile = async (val) => {
    try {
      const sendbody = {
        val: parseInt(val),
        user_id: localStorage.getItem('user_id'),
      }
      console.log("In Filter Profile Function:", sendbody)
      // const response = await fetch(
      //   'http://localhost:3000/api/utils/filterGroup',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(sendbody),
      //   }
      // )
      const { data } = await axios.post('http://localhost:3000/api/utils/filterGroup', sendbody)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <globalContext.Provider
      value={{
        register,
        login,
        isLoggedIn,
        setIsLoggedIn,
        filterProfile,
        queue,
        setQueue,
        room_id,
        setRoom_id,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default globalContext
