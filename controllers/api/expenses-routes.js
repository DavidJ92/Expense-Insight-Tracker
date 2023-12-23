const router = require("express").Router();
const { User, Expense } = require("../../models");
const withAuth = require("../../utils/auth");

// route to all added expenses
router.get("/", withAuth, async (req, res) => {
  const expenseData = await Expense.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  res.json(expenseData);
});

// Add an expense for the logged-in user
router.post("/add-expense", withAuth, async (req, res) => {
  try {
    const { date, category, amount } = req.body;

    // Find the logged-in user
    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an expense associated with the user
    const expense = await Expense.create({
      date,
      category,
      amount,
      UserId: user.id, // Associate the expense with the user
    });

    res.status(200).json({ message: "Expense added successfully", expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding expense" });
  }
});

// route to create/add a new expense using async/await
// router.post("/add", withAuth, async (req, res) => {
//   try {
//     const { category, amount, date } = req.body;

//     // Assuming you have a user ID associated with the logged-in user
//     const userId = req.session.user_id;

//     // Create a new expense
//     const newExpense = await Expense.create({
//       category,
//       amount,
//       date,
//       user_id: userId,
//     });
//     // if the spending is successfully created, the new response will be returned as json
//     res.status(200).json(newExpense);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to add expense." });
//   }
// });

module.exports = router;
