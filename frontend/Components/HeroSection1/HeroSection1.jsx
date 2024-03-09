import { Button, Box } from '@chakra-ui/react'

import img1 from '/assets/img1.jpeg'
import img2 from '/assets/img2.jpeg'
import img3 from '/assets/img3.jpg'
import img4 from '/assets/img4.jpg'
import './HeroSection1.css'

function HeroSection1() {
  return (
    <>
      <div className='hero_section_1-container'>
        <div className='hero_1-text'>
          <div className='hero_1-text--primary'>
            Ace It: Study Smarter with Virtuoso
          </div>
          <div className='hero_1-text--secondary'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
            consectetur ipsam{' '}
          </div>
          <Button
            colorScheme='twitter'
            variant='solid'
            size='lg'
            style={{
              width: '30%',
            }}
          >
            EXPLORE!
          </Button>
        </div>
        <div className='color'>
          <div className='test'>
            <Box
              color='red'
              size='md'
              className='test-box'
            >
              <img
                src={img1}
                width='350px'
                className='image1'
                alt=''
              />
            </Box>
            <Box
              color='red'
              size='md'
              className='test-box'
            >
              <img
                src={img2}
                width='500px'
                // height=''
                className='image2'
                alt=''
              />
            </Box>
            <Box
              color='red'
              size='md'
              className='test-box'
            >
              <img
                src={img3}
                // height='200px'
                className='image3'
                alt=''
              />
            </Box>
            <Box
              color='red'
              size='md'
              className='test-box'
            >
              <img
                src={img4}
                width='450px'
                className='image4'
                alt=''
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection1
