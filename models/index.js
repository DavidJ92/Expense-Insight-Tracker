const User = require('./User');
const Spending = require('./spending');

//a user can have many spending
User.hasMany(Spending, {
    foreignKey: 'user_id',
});

//spending belongs to a single user
Spending.belongsTo(User, {
    foreignKey: 'user_id',
  });

// //spending has one user
// Spending.hasOne(User, {
//     foreignKey: 'user_id',
// });

module.exports = { User, Spending };