// server.js
const express = require('express');
const SocketServer = require('./node_modules/ws').Server;
let userCount = 0; // Counts the amount of users online

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  userCount ++;
  // Updates the online users count every time
  wss.clients.forEach((earlyClient)=>earlyClient.send(JSON.stringify({totalClientCount: userCount})))

  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      // if (client.readyState === SocketServer.OPEN) {
        const {username, content, id, type} = JSON.parse(data);
        const createId = {
          id: id,
          content: content,
          username: username ? username : "Anonymous",
          type: type
        }
        client.send(JSON.stringify(createId));
      // }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    userCount--;
    wss.clients.forEach((earlyClient)=>earlyClient.send(JSON.stringify({totalClientCount: userCount})))
  });
});

