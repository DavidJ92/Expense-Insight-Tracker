const router = require('express').Router();
const { Expenses } = require('../models');
const withAuth = require('../utils/auth');

//if user is logged in, show spendings for the year
router.get('/', withAuth, async (req, res) => {
  try {
    const spendingData = await Expenses.findAll();
    console.log(spendingData);
    const spendings = spendingData.map((spending) => spending.get({ plain: true }));
    console.log("here", spendings);
         res.render('all', { spendings });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

//   Spending.findAll()
//   .then((data)=>{
//     console.log("THIS SI DATA = ",data)
//     const spendings = data.map((spending) => spending.get({ plain: true }));
//     console.log("HERE IS THE SERIALIZED VERSION = ", spendings);
//          res.render('all', { spendings });
//   }).catch((err)=>{
//     console.log(err)
//     res.status(500).json(err)  
// })

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
  req.session.destroy(() => {
     // else render logout.handlebars
   res.render('logout');
  });
 }
});

module.exports = router;
