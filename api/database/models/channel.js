const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { member, message } = models;
      this.hasMany(member);
      this.hasMany(message);
    }
  }
  channel.init(
    {
      name: { type: DataTypes.STRING(50), allowNull: false },
      describe: { type: DataTypes.STRING(300), allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
    },
    {
      sequelize,
      modelName: 'channel',
      timestamps: false,
    }
  );
  return channel;
};
