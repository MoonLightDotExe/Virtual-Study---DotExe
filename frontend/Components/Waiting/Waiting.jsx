import React from 'react'

import './Waiting.css'

function Waiting() {
  return (
    <div className='waiting-container'>
      <div class='center'>
        <div class='pencil'>
          <div class='top'></div>
        </div>
        <div class='stroke'></div>
      </div>
      <div className='waiting-text'>
        Please wait while we find suitable partners ;)
      </div>
    </div>
  )
}

export default Waiting
