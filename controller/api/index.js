const router = require('express').Router();

const userRoutes = require('./user-routes');
const expensesRoutes = require('./expenses-routes');

router.use('/users', userRoutes);
router.use('/expenses', expensesRoutes);

module.exports = router;
