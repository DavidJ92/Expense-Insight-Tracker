const User = require('./User');
const Expenses = require('./Expenses');

//a user can have many spending
User.hasMany(Expenses, {
    foreignKey: 'user_id',
});

//spending belongs to a single user
Expenses.belongsTo(User, {
    foreignKey: 'user_id',
  });

// //spending has one user
// Spending.hasOne(User, {
//     foreignKey: 'user_id',
// });

module.exports = { User, Expenses };