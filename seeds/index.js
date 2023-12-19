const sequelize = require('../config/connection');
const { User } = require('../models');
const Spending = require('../models/spending');
const spendingData = require('./spendingData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate
  (userData, {
    individualHooks: true,
    returning: true,
  });

  const spending = await Spending.bulkCreate(spendingData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
