const sequelize = require('../config/connection');
const seedChart = require('./chartData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedChart();

  process.exit(0);
};

seedAll();
