module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING(50), allowNull: false },
      email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      isAdmin: { type: Sequelize.TINYINT, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
