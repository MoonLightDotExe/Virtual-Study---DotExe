import React from 'react'

import './Transcript.css'
function Transcript({ transcript }) {
  return (
    <div className='transcript-container'>
      <div className='transcript-head'>TRANSCRIPT</div>
      <div className='transcript-body'>{transcript}</div>
    </div>
  )
}

export default Transcript
