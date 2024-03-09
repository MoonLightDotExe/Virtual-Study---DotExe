import React from 'react'

import './ChatRoom.css'

function ChatRoom({ id }) {
  return (
    <iframe
      allow='camera; microphone; display-capture; autoplay;'
      width='100%'
      height='879px'
      src={id}
      allowfullscreen='true'
    ></iframe>
  )
}

export default ChatRoom
