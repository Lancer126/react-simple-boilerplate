import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      message: ""
    }
  }

  handleMessage = (e) => {
    this.setState({
      username: this.state.username,
      message: e.target.value
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(this.state.message);
      this.props.updateName(this.state.username);
      this.setState({
        username: this.state.username,
        message: ""
      });
    }
  }

  updateName = (e) => {
    this.setState({
      username: e.target.value,
      message: this.state.message
    })
  }

  render() {
    return (
      <footer className="chatbar" >
          <input onKeyUp={this.updateName} name="name" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.username} />
          <input onChange={this.handleMessage} onKeyDown={this.handleKeyDown} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} />
      </footer>
    )
  }
};
export default ChatBar;