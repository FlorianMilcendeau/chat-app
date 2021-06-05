const debug = require('debug');

const debugLog = debug('api:socket:channel');

const channel = (socket) => {
  socket.on('channel:join', (room) => {
    debugLog(`Room id: ${room}`);

    if (!socket.rooms.has(room)) {
      socket.join(room);
    }
  });
};

module.exports = channel;
