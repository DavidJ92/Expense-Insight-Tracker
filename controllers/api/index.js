const router = require('express').Router();

const userRoutes = require('./user-routes');
// const spendingRoutes = require('./spending-routes');

router.use('/users', userRoutes);
// router.use('/expenses', spendingRoutes);

module.exports = router;
