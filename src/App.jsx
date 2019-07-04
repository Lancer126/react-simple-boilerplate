import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Header from './Header.jsx';
import uuid from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: uuid.v4(),
          type: "incomingMessage"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: uuid.v4(),
          type: "incomingMessage"
        }
      ],
      usersAmount: 0
    }
    this.SocketServer = new WebSocket('ws://localhost:3001');
  }

  // Will send a notification to the socket server
  sendNotification = msg => {
    this.SocketServer.send(JSON.stringify(msg));
  };

  createMessage = (message, type) => {
    if(type === "postMessage") {
      message.type = "incomingMessage";
    } else if (type === "incomingNotification") {
      message.type = "incomingNotification";
    }
    message.id = uuid.v4();
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ messages: newMessages });
  }

  handleOnMessage = (event) => {
    // We need to parse the incoming message
    const incomingMessage = JSON.parse(event.data);
    if(incomingMessage.type) {
      this.createMessage(incomingMessage, incomingMessage.type)
    } else {
      this.setState({
        usersAmount: incomingMessage.totalClientCount
      })
    }
    
  };

  componentDidMount() {
    this.SocketServer.onmessage = this.handleOnMessage;
  }

  addMessage = (state, type) => {
    state.type = type;
    this.sendNotification(state);
  }

  updateName = (state, type) => {
    const notificationMsg = `${
      this.state.currentUser.name ? this.state.currentUser.name : "Anonymous"
    } has changed their name to ${state.username ? state.username : "Anonymous"}`;
    let newObj = {...state, content: notificationMsg, type: type};
    this.sendNotification(newObj);

    this.setState({ currentUser: {name: state.username }});
  }

  render() {
    return (
      <div>
      <Header users={this.state.usersAmount}/>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} updateName={this.updateName} />
      </div>
    )
  }
}
export default App;
