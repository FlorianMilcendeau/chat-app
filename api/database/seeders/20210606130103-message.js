module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('messages', [
      {
        content: 'Hello world',
        userId: 1,
        channelId: 1,
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('messages', null, {});
  },
};
