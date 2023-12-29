const router = require("express").Router();
const { Expense, User } = require("../models");
const withAuth = require("../utils/auth");

// route to get all expenses
router.get("/", async (req, res) => {
  try {
    const expenseData = await Expense.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const expenses = expenseData.map((expense) => expense.get({ plain: true }));
    const userId = req.session.user_id;

    // find logged in user's info
    const userData = await User.findByPk(userId, {
      attributes: ["name"],
    });

    if (!userData) {
      return res.redirect("/login");
    }

    res.render("home", {
      expenses,
      name: userData.name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// route to find expense by id
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

// route to find user withAuth based on session to add-expense
router.get("/add-expense", withAuth, async (req, res) => {
  try {
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

// route to find user withAuth based on session to view monthly expense
router.get("/monthly-expenses", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Expense }],
    });

    const user = userData.get({ plain: true });

    res.render("monthlyExpense", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// if the user is already logged in, redirect to 'home'
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// if the user is already signed up, redirect to 'home'
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

module.exports = router;
