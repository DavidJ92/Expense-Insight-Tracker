const router = require('express').Router();
const { Spending } = require('../../models');

// Set up routes
router.get('/', async (req, res) => {
    const spendingHistory = await Spending.findAll();
    res.render('index', { spendingHistory });
});

router.post('/spending', async (req, res) => {
    try {
        const newSpending = await Spending.create(req.body);
        res.json(newSpending);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/spending', async (req, res) => {
    try {
        const spendingData = await Spending.findAll();
        res.json(spendingData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;