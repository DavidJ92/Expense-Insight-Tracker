const router = require('express').Router();
const withAuth = require('../utils/auth');

//if user is logged in, show line chart for the year
router.get('/', withAuth, async (req, res) => {
  try {
    const chartData = await Chart.findAll({
      include: [
        {
          // model: Dashboard,
          // attributes: ['title', 'date'],
        },
      ],
    });

    const expenseChart = chartData.map((chart) =>
      chart.get({ plain: true })
    );
    
    res.render('main', {
      expenseChart,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
