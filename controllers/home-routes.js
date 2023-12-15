const router = require('express').Router();

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
