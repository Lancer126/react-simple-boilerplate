import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ""
    }
  }

  //Handles the written message
  handleMessage = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  //Handles the key down for the Name
  handleKeyDownName = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      if(this.props.currentUser !== this.state.username) {
        this.props.updateName(this.state, "postNotification");
      }
    }
  }

  //Handles the key down for the Message
  handleKeyDownMsg = (e) => {
    if (e.key === 'Enter') {
      if(this.props.currentUser !== this.state.username) {
        this.props.updateName(this.state, "postNotification");
      }
      this.props.addMessage(this.state, "postMessage");
      this.setState({
        content: ""
      })
    }
  }

  //Handles the name
  updateName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <footer className="chatbar" >
          <input onKeyUp={this.updateName} onKeyDown={this.handleKeyDownName} name="name" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.username} />
          <input onChange={this.handleMessage} onKeyDown={this.handleKeyDownMsg} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} />
      </footer>
    )
  }
};
export default ChatBar;