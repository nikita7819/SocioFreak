import React from 'react'
import './message.css'
import { format } from 'timeago.js';

function Message({message,own}) {
  return (
    <div className={own?"message own":"message"}>
      <div className="messageTop">
        <img src="https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1468379.jpg&fm=jpg" alt="" className='messageImg' />
        <p className='messageText'>{message.text}</p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}

export default Message