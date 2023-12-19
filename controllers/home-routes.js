const router = require('express').Router();
const { Spending } = require('../models');
const withAuth = require('../utils/auth');

//if user is logged in, show line chart for the year
router.get('/', async (req, res) => {
  const spendingData = await Spending.findAll().catch((err) => { 
      res.json(err);
    });
      const spendings = spendingData.map((spending) => spending.get({ plain: true }));
      res.render('all', { spendings });
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
