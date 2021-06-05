const SocketIO = require('socket.io');
const debug = require('debug');
const channelHandler = require('./channel');

const debugLog = debug('api:socket');

const socketIO = (httpServer) => {
  const options = {
    cors: {
      origin: 'http://localhost',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  };

  const io = SocketIO(httpServer, { ...options });

  io.on('connection', (socket) => {
    debugLog(`Client connected: ${socket.id}`);

    channelHandler(socket);

    socket.on('disconnect', () => {
      debugLog('Client disconnected');
    });
  });
};

module.exports = socketIO;
