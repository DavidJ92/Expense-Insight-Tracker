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


module.exports = router;
