import Navbar from './../Components/Navbar/Navbar'

import './App.css'
import HeroSection1 from './../Components/HeroSection1/HeroSection1'
import Features from './../Components/Features/Features'
import Footer from './../Components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <HeroSection1 />
      <Features />
      <Footer />
      {/* <iframe
        allow='camera; microphone; display-capture; autoplay;'
        width='1200px'
        height='1200px'
        src='https://loc.digitalsamba.com/sivisYfL9i5Ep3y'
        allowfullscreen='true'
      ></iframe> */}
    </>
  )
}

export default App
