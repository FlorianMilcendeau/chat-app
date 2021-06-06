module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('channels', [
      {
        name: 'Welcome',
        describe: 'Group of welcome to chat app',
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('channels', null, {});
  },
};
