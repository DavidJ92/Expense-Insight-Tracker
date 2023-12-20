const router = require('express').Router();
const { Expense } = require('../../models');
const withAuth = require('../../utils/auth');

// get all added expenses route
router.get('/add-expense', withAuth, async (req, res) => {
  try {
    const allExpenses = await Expense.findAll({
      include: [
        {
          attributes: ['date', 'category', 'amount']
        },
      ],
    });

    res.render('addExpense', { allExpenses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to load all expenses. Please try again.' });
  }
});

// route to create/add a new expense using async/await
router.post('/add-expense', withAuth, async (req, res) => {
    try { 
      const { category, amount, date } = req.body;

      // Assuming you have a user ID associated with the logged-in user
      const userId = req.session.user_id;
  
      // Create a new expense
      const newExpense = await Expense.create({
        category,
        amount,
        date,
        user_id: userId,
    });
    // if the spending is successfully created, the new response will be returned as json
    res.status(200).json(newExpense)
  } catch (err) {
    res.status(400).json({ message: 'Failed to add expense.' });
  }
  });

module.exports = router;