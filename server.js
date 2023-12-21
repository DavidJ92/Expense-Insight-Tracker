const path = require('path');
const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require('./controllers');
require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const hbs = exphbs.create({ helpers });

// Set up handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middleware
// app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true, store: new SequelizeStore({
    db: sequelize}) }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use(routes);

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false })
.then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: true });
  });

  });  
