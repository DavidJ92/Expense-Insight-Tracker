const router = require('express').Router();
const { Expense, User } = require('../models');
const withAuth = require('../utils/auth');

//if user is logged in, show all expenses for the year
router.get('/', withAuth, async (req, res) => {
  try {
  const expenseData = await Expense.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] },
      }
    ]
  });

  const expenses = expenseData.map((expense) => expense.get({ plain: true }));

  res.render('all', {
    expenses,
    loggedIn: req.session.loggedIn,
  });
} catch (err) {
  res.status(500).json(err);
} 
  
  // try {
  //   const spendingData = await Expense.findAll();
  //   console.log(spendingData);
  //   const spendings = spendingData.map((spending) => spending.get({ plain: true }));
  //   console.log("here", spendings);
  //        res.render('all', { spendings });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }

//another way to try the above arrow function with .then and .catch  
//   Expense.findAll()
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

// GET home route
router.get('/', (req, res) => {
  // if user is logged in, redirects to homepage
  if (req.session.loggedIn) {
     res.redirect('/login');
     return;
  }
  // else render login.handlebars
  res.render('login');
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

// GET add-expense route
router.get('/logout', (req, res) => {
  // if user is logged in, redirects to a
  if (!req.session.loggedIn) {
   res.redirect('/');
   return;
 }
  // else render login.handlebars
  res.render('login');
 });

// GET add-expense route
router.get('/add-expense', (req, res) => {
 // if user is logged in, redirects to a
 if (req.session.loggedIn) {
  res.redirect('/');
  return;
}
 // else render login.handlebars
 res.render('login');
});

module.exports = router;

// get user's expenses
router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Expense, 
          attributes: [ 'date', 'category', 'amount' ]
        }
      ]
    });

    const user = userData.get({ plain: true });

    res.render('addExpense', {
      ...user,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;