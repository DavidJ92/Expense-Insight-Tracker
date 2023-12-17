const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Spending extends Model {}

// static init(sequelize) {
//   super.init(
//     {

Spending.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'spending'
  }
);

//   }
// }
   
module.exports = Spending;