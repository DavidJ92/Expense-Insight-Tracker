const router = require('express').Router();
const { Spending } = require('../../models');

// route to create/add a dish using async/await
router.post('/', async (req, res) => {
    try { 
      const spendingData = await Spending.create({
      category: req.body.category,
      amount: req.body.amount,
      date: req.body.date,
      user_id: req.body.user_id,
    });
    // if the spending is successfully created, the new response will be returned as json
    res.status(200).json(spendingData)
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