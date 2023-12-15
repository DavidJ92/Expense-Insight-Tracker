const Sequelize = require('sequelize');
require('dotenv').config();

<<<<<<< HEAD
// feature/add-expenses
// const sequelize = new Sequelize(process.env.DB_STRING);

// module.exports = sequelize;

=======
>>>>>>> 4c5d93f (fix error in connection.js/dowload express-handlebars dependency)
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
<<<<<<< HEAD
// main
=======

>>>>>>> 4c5d93f (fix error in connection.js/dowload express-handlebars dependency)
