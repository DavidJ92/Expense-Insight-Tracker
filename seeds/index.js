const sequelize = require('../config/connection');
const { User, Spending } = require('../models');
const expensesData = require('./expensesData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate
  (userData, {
    individualHooks: true,
    returning: true,
  });

  const spending = await Spending.bulkCreate(expensesData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
