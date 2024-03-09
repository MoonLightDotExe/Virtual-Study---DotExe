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

function App() {
  const { setIsLoggedIn } = useContext(globalContext)
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
          element={
            <iframe
              allow='camera; microphone; display-capture; autoplay;'
              width='1700px'
              height='700px'
              src='https://loc.digitalsamba.com/sivisYfL9i5Ep3y'
              allowfullscreen='true'
            ></iframe>
          }
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
