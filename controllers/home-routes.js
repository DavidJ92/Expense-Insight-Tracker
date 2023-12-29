const router = require("express").Router();
const { Expense, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all expenses and JOIN with user data
    const expenseData = await Expense.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize expense data
    const expenses = expenseData.map((expense) => expense.get({ plain: true }));

    // Assuming user_id is stored in the session
    const userId = req.session.user_id;

    // Fetch the logged-in user's data from the database
    const userData = await User.findByPk(userId, {
      attributes: ["name"], // Include other attributes as needed
    });

    if (!userData) {
      // Handle case where user data is not found
      return res.redirect("/login");
    }

    // Pass both serialized expense data and user data to the template
    res.render("home", {
      expenses,
      name: userData.name,
      // Add other data properties as needed
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
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

router.get("/monthly-expenses", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
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

module.exports = router;
