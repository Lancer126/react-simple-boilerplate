import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList(props) {
  return (
  <main className="messages">
    { props.messages.map(message => {
      return <Message key={message.id} message={message}/>
    })
  }
  </main>);
}

export default MessageList;