const router = require('express').Router();
const { Expenses } = require('../../models');
const withAuth = require('../../utils/auth');

//if user is logged in, show spendings for the year
router.get('/', withAuth, async (req, res) => {
  const spendingData = await Expenses.findAll().catch((err) => { 
      res.json(err);
    });
      const spendings = spendingData.map((spending) => spending.get({ plain: true }));
      res.render('spending');
    });

// route to create/add a spending using async/await
router.post('/add-expense', async (req, res) => {
    try { 
      const spendingData = await Expenses.create({
      date: req.body.date,
      category: req.body.category,
      amount: req.body.amount,
      user_id: req.body.user_id,
    });
    // if the spending is successfully created, the new response will be returned as json
    res.status(200).json(expensesData)
  } catch (err) {
    res.status(400).json(err);
  }
  });

// // Set up routes
// router.get('/', async (req, res) => {
//     const spendingHistory = await Spending.findAll();
//     res.render('index', { spendingHistory });
// });

// router.post('/spending', async (req, res) => {
//     try {
//         const newSpending = await Spending.create(req.body);
//         res.json(newSpending);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

// router.get('/spending', async (req, res) => {
//     try {
//         const spendingData = await Spending.findAll();
//         res.json(spendingData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;