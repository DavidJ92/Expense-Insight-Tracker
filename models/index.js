// model/index.js
const User = require('./User');
const Expense = require('./Expense');

// A user can have many expenses
User.hasMany(Expense, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// An expense belongs to a single user
Expense.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Expense };