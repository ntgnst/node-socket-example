const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const socketServer = socketIO(server);


const activeUser = {
  id: null,
  name: null,
  connectionId: null,
  connectedAt: null
};

socketServer.on('connection', socket => {
  
  socket.emit('message', 'Welcome to socketio server.');
  
  socketServer.on('disconnect', socket => {
    socket.emit('message', 'Bye.');
  });
});



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req,res) => {
 res.send('Hello Socket Example.');
  res.end();
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.warn(`Server listening on ${PORT}`);
});
