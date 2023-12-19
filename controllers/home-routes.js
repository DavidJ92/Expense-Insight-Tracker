const router = require('express').Router();
const { Spending } = require('../models');
const withAuth = require('../utils/auth');

//if user is logged in, show spendings for the year
router.get('/', withAuth, async (req, res) => {
  const spendingData = await Spending.findAll().catch((err) => { 
      res.json(err);
    });
      const spendings = spendingData.map((spending) => spending.get({ plain: true }));
      res.render('all', { spendings });
    });

// GET login route
router.get('/login', (req, res) => {
 // if user is logged in, redirects to homepage
 if (req.session.loggedIn) {
    res.redirect('/');
    return;
 }
 // else render login.handlebars
 res.render('login');
});

// GET sign up route
router.get('/signup', (req, res) => {
 // if user is logged in, redirects to homepage
 if (req.session.loggedIn) {
    res.redirect('/');
    return;
 }
 // else render signup.handlebars
 res.render('signup');
});

// GET logout route
router.get('/logout', (req, res) => {
 // if user is logged out, redirects to logout page
 if (req.session.loggedOut) {
    res.redirect('/');
    return;
 }
 // else render logout.handlebars
 res.render('logout');
});

module.exports = router;
