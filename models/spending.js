const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
 host: process.env.DB_HOST,
 dialect: 'mysql'
});

const Spending = sequelize.define('spending', {
 month: {
    type: DataTypes.STRING,
    allowNull: false
 },
 amount: {
    type: DataTypes.FLOAT,
    allowNull: false
 }
});

module.exports = Spending;