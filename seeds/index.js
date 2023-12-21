const seedUsers = require("./userData");
const seedExpenses = require("./expenseData");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.JAWSDB_URL);

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedExpenses();

  process.exit(0);
};

seedAll();
