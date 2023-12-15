const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const Spending = require('./models/spending');

const sequelize = require('./config/connection');
const app = express();

// Set up handlebars view engine
app.engine('handlebars', hbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.get('/', async (req, res) => {
    const spendingHistory = await Spending.findAll();
    res.render('index', { spendingHistory });
});

app.post('/spending', async (req, res) => {
    try {
        const newSpending = await Spending.create(req.body);
        res.json(newSpending);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/spending', async (req, res) => {
    try {
        const spendingData = await Spending.findAll();
        res.json(spendingData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});