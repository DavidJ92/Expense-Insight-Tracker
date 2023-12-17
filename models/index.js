const User = require('./User');
const Spending = require('./spending');

//a user can have many spending
User.hasMany(Spending, {
    foreignKey: 'spending',
});

//spending belongs to a single user
Spending.belongsTo(User, {
    foreignKey: 'spending',
  });

//spending has one user
Spending.hasOne(User, {
    foreignKey: 'spending',
});

module.exports = { User, Spending };