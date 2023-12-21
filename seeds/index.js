const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedExpenses = require('./expenseData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedExpenses();

  process.exit(0);
};

seedAll();
