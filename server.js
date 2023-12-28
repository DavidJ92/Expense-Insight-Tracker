const path = require("path");
const express = require("express");
const session = require("express-session");
// const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const routes = require("./controllers");
require("dotenv").config();

const seedUsers = require("./seeds/userData");
const seedExpenses = require("./seeds/expenseData");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const hbs = exphbs.create({ helpers });

// Set up handlebars view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up middleware
const sess = {
  secret: "492e6d5d35b6bcb0f62369d704d778cc",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//use routes
app.use(routes);

// Start server
const PORT = process.env.PORT || 3000;
const { User } = require("./models");
sequelize.sync({ force: false }).then(async () => {
  User.findAll().then(async (users) => {
    if (users.length === 0) {
      await seedUsers();
      await seedExpenses();
    }
  });

  app.listen(PORT, () => console.log("Now listening"));
});
