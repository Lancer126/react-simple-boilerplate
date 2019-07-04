import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

function MessageList(props) {
  return (
  <main className="messages">
    { props.messages.map(message => {
      if(message.type === "incomingMessage") {
        console.log("Message: ", message);
        return <Message key={message.id} message={message}/>
      } else {
        console.log("Notification: ", message);
        return <Notification key={message.id} message={message.content}/>
      }
    })
  }
  </main>);
}

export default MessageList;