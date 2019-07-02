import React, {Component} from 'react';

function ChatBar(props) {
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(props.addMessage);
      props.addMessage(e.target.value);
      e.target.value = "";
    }
  }

  const updateName = (e) => {
    props.updateName(e.target.value);
  }

  return (
    <footer className="chatbar" >
        <input onKeyUp={updateName} name="name" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser} />
        <input onKeyDown={_handleKeyDown} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  )
};
export default ChatBar;