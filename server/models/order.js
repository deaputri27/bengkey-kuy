'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Partner, { foreignKey: 'partnerId' })
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.hasMany(models.OrderDetail, { foreignKey: 'orderId' })
    }
  }
  Order.init({
    problem: DataTypes.STRING,
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
      validate: {
        notEmpty: { msg: `Location is require` },
        notNull: { msg: `Location is invalid` },
      }
    },
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    car: DataTypes.STRING,
    carType: DataTypes.STRING,
    license: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `User id is require` },
        notNull: { msg: `User id is invalid` },
      }
    },
    partnerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};