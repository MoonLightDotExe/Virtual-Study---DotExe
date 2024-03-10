import { useEffect, useContext } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import globalContext from '../Context/globalContext'
import Navbar from './../Components/Navbar/Navbar'
import HeroSection1 from './../Components/HeroSection1/HeroSection1'
import Features from './../Components/Features/Features'
import Footer from './../Components/Footer/Footer'
import Login from '../Components/Login/Login'
import Signup from '../Components/Signup/Signup'
import Profile from '../Components/Profile/Profile'

import './App.css'
import Waiting from '../Components/Waiting/Waiting'
import ChatRoom from '../Components/ChatRoom/ChatRoom'
import Group from '../Components/Group/Group'

function App() {
  const { setIsLoggedIn, room_id } = useContext(globalContext)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <HeroSection1 />
              <Features />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path='/login'
          element={<Login />}
        ></Route>
        <Route
          path='/signUp'
          element={<Signup />}
        ></Route>
        <Route
          path='/profile'
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        ></Route>
        <Route
          path='/call'
          element={<ChatRoom id={room_id} />}
        ></Route>
        <Route
          path='/waiting'
          element={<Waiting />}
        ></Route>
        <Route
          path='/test'
          element={<Group />}
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
