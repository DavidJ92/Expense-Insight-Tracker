const router = require('express').Router();
const { Expense } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenseData = await Expense.findAll();
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single expense
router.get('/:id', async (req, res) => {
  try {
    const expenseData = await Expense.findByPk(req.params.id);

    if (!expenseData) {
      res.status(404).json({ message: 'No expense found with that id!' });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new expense
router.post('/', withAuth, async (req, res) => {
  try {
    const expenseData = await Expense.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE an expense
router.put('/:id', withAuth, async (req, res) => {
  try {
    const expenseData = await Expense.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!expenseData) {
      res.status(404).json({ message: 'No expense found with that id!' });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an expense
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const expenseData = await Expense.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!expenseData) {
      res.status(404).json({ message: 'No expense found with that id!' });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
