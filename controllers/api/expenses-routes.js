const router = require("express").Router();
const { Expense } = require("../../models");
const withAuth = require("../../utils/auth");

// route to post new expense
router.post("/", withAuth, async (req, res) => {
  try {
    const newExpense = await Expense.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newExpense);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to delete an expense
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const expenseData = await Expense.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!expenseData) {
      res.status(404).json({ message: "No expense found with this ID." });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
