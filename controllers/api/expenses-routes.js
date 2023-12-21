const router = require('express').Router();
const { Expense } = require('../../models');
const withAuth = require('../../utils/auth');

// route to all added expenses
router.get('/add-expense', withAuth, async (req, res) => {
  try {
    const allExpenses = await Expense.findAll({
      include: [
        {
          attributes: ['date', 'category', 'amount', 'description'],
        },
      ],
    });

    res.render('add-expense', { loggedIn: req.session.loggedIn, allExpenses });
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

  // route to delete an existing expense
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const oneExpense = Expense.destroy({
          where: {
              id: req.params.id, 
              user_id: req.session.user_id
          },
      });

      if (!oneExpense) {
          res.status(400).json({message: 'No expense with that amount found.'})
      }
      res.status(200).json('Expense has been deleted.')
  } catch (err) {
      res.status(500).json(err);
  };
});

// GET the latest added expense
router.get('/latest', withAuth, async (req, res) => {
  try {
    const latestExpense = await Expense.findOne({
      attributes: ['id', 'category', 'amount', 'date'],
      where: { user_id: req.session.user_id }, // Assuming user ID is stored in the session
      order: [['createdAt', 'DESC']], // Order by creation date in descending order
    });

    if (!latestExpense) {
      return res.status(404).json({ message: 'No expenses found.' });
    }

    res.status(200).json(latestExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch the latest expense.' });
  }
});

module.exports = router;