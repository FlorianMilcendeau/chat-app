module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('members', [
      {
        role: 'chatting',
        userId: 1,
        channelId: 1,
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('members', null, {});
  },
};
