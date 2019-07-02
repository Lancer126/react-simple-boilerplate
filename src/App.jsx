import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { generateRandomId } from "../utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 126
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 1337
        }
      ]
    }
  }

  addMessage(message) {
    setTimeout(() => {
      let messageObject = {
        username: this.state.currentUser.name ? this.state.currentUser.name : "Anonymous",
        content: message,
        id: generateRandomId()
      };
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, messageObject];
      this.setState({ messages: newMessages });
    }, 2000);
  }

  updateName(name) {
    this.setState({ currentUser: {name: name }});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} updateName={this.updateName} />
      </div>
    )
  }
}
export default App;
