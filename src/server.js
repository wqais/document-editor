const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
const PORT = process.env.PORT || 5000;

// Use cors middleware to allow requests from any origin
// app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('edit', ({ documentId, content }) => {
    console.log('Received edit event:', { documentId, content });
    // Emit 'update' event to all connected clients except the sender
    socket.broadcast.emit('update', { documentId, content });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
