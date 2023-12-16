const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const Spending = require('./models/spending');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const app = express();
const hbs = exphbs.create({ helpers });

// Set up handlebars view engine
app.engine('handlebars', hbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});