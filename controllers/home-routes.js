const router = require("express").Router();
const { Expense, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const expenseData = await Expense.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const expenses = expenseData.map((expense) => expense.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("home", {
      expenses,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/expenses/:id", async (req, res) => {
  try {
    const expenseData = await Expense.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const expense = expenseData.get({ plain: true });

    res.render("addExpense", {
      ...expense,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/add-expense", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Expense }],
    });

    const user = userData.get({ plain: true });

    res.render("addExpense", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Expense, 
          attributes: [ 'id', 'date', 'category', 'amount', 'category', 'user_id' ],
        }
      ]
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('home', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// redirect to login if the user is logged in; otherwise, render login.handlebars
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// redirect to homepage if the user is logged in; otherwise, render signup.handlebars
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
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

module.exports = router;
