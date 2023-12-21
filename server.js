const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require('./controllers');
require('dotenv').config();

const seedUsers = require('./seeds/userData');
const seedExpenses = require('./seeds/expenseData');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const hbs = exphbs.create({ helpers });

// Set up handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define a middleware function to redirect users to the login page if not logged in
const redirectToLogin = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login'); // Redirect to the login page if not logged in
  } else {
    next(); // Continue to the next middleware if user is logged in
  }
};

// Apply the redirectToLogin middleware to handle all incoming requests
app.use((req, res, next) => {
  if (!req.session.loggedIn && req.url !== '/login' && req.url !== '/signup') {
    res.redirect('/login'); // Redirect to login if not logged in and not on login/signup pages
  } else {
    next();
  }
});

// Set up middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
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

  app.listen(PORT, () => console.log('Now listening'));
});
