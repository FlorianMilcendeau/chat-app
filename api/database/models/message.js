const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { user, channel } = models;
      this.belongsTo(user);
      this.belongsTo(channel);
    }
  }
  message.init(
    {
      content: { type: DataTypes.TEXT, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      channel_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
    },
    {
      sequelize,
      modelName: 'message',
    }
  );
  return message;
};
