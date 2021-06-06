const Message = require('../../database/models').message;
const User = require('../../database/models').user;

const message = (socket, io) => {
  socket.on('message:send', async (data) => {
    const messageEntity = await Message.create(data, { raw: true });

    const { channelId, userId, ...msg } = messageEntity.get({ plain: true });
    const { password, ...user } = await User.findByPk(userId, { raw: true });

    io.in(data.channelId).emit('message:send', { ...msg, user });
  });
};

module.exports = message;
