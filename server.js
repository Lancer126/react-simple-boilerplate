var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../boilerplate/webpack.config');
// server.js
const express = require('express');
const SocketServer = require('../chatty-server/node_modules/ws').Server;
let userCount = 0;

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

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
