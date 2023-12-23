const router = require("express").Router();
const { Expense } = require("../models");
const withAuth = require("../utils/auth");

// show all expenses for the year if the user is logged in
router.get("/", withAuth, async (req, res) => {
  try {
    res.render("home", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// redirect to login if the user is logged in; otherwise, render login.handlebars
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

// redirect to homepage if the user is logged in; otherwise, render signup.handlebars
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

// logout and redirect to the homepage
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

// render addExpense.handlebars if the user is logged in
router.get("/add-expense", withAuth, async (req, res) => {
  if (req.session.loggedIn) {
    res.render("addExpense", { loggedIn: req.session.loggedIn });
  }
});

module.exports = router;
