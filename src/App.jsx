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
          username: "Chatty",
          content: "Welcome to Chatty App!", //greets the users
          id: uuid.v4(),
          type: "incomingMessage"
        }
      ],
      usersAmount: 0
    }

    //Initializes the socket server
    this.SocketServer = new WebSocket('ws://localhost:3001');
  }

  // Will send a notification to the socket server
  sendNotification = msg => {
    this.SocketServer.send(JSON.stringify(msg));
  };

  //Adds a message in the state
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

  //Does something with the received messages
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

  //After the component mounted, checks for new messages and sends them to handleOnMessage
  componentDidMount() {
    this.SocketServer.onmessage = this.handleOnMessage;
  }

  //Broadcasts the message to everyone
  addMessage = (state, type) => {
    state.type = type;
    this.sendNotification(state);
  }

  //Updates the name in the state and send a notification to all users
  updateName = (ChatState, type) => {
    const notificationMsg = `${
      this.state.currentUser.name ? this.state.currentUser.name : "Anonymous"
    } has changed their name to ${ChatState.username ? ChatState.username : "Anonymous"}`;
    let newObj = {...ChatState, content: notificationMsg, type: type};
    this.sendNotification(newObj);

    this.setState({ currentUser: {name: ChatState.username }});
  }

  //Shows the header, messages and chatbar
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
