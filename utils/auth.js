const withAuth = (req, res, next) => {
  //if user not logged in, redirects them to login page
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  // } else {
    next();
  // }
};

module.exports = withAuth;
