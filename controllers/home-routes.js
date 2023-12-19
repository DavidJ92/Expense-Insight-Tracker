const router = require('express').Router();
const { Spending } = require('../models');
const withAuth = require('../utils/auth');

//if user is logged in, show line chart for the year
router.get('/', withAuth, async (req, res) => {
  const spendingHistory = await Spending.findAll();
  res.render('index', { spendingHistory });
});

router.post('/spending', withAuth, async (req, res) => {
  try {
      const newSpending = await Spending.create(req.body);
      res.json(newSpending);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

router.get('/spending', withAuth, async (req, res) => {
  try {
      const spendingData = await Spending.findAll();
      res.json(spendingData);
    
      res.render('main', {
        expenseChart,
        loggedIn: req.session.loggedIn,
      });

  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

//login route
router.get('/login', (req, res) => {
  //if user is logged in, redirects to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //else render login.handlebars
  res.render('login');
});

//sign up route
router.get('/signup', (req, res) => {
  //if user is logged in, redirects to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //else render signup.handlebars
  res.render('signup');
});

//logout route
router.get('/logout', (req, res) => {
    //if user is logged out, redirects to logout page
    if (req.session.loggedOut) {
      res.redirect('/');
      return;
    }
    //else render logout.handlebars
    res.render('logout');
  });

module.exports = router;