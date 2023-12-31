const { Expense } = require("../models");

const expenseData = [
  {
    date: "12/1/23",
    category: "month",
    amount: "43.50",
    user_id: 1,
  },
  {
    date: "12/2/23",
    category: "Travel",
    amount: "33.54",
    user_id: 1,
  },
  {
    date: "12/3/23",
    category: "Miscellaneous",
    amount: "5.24",
    user_id: 1,
  },
  {
    date: "12/4/23",
    category: "Bills & Utilities",
    amount: "200.14",
    user_id: 1,
  },
  {
    date: "12/5/23",
    category: "Restaurants",
    amount: "10.42",
    user_id: 1,
  },
  {
    date: "12/6/23",
    category: "Loan Payments",
    amount: "439.83",
    user_id: 1,
  },
];

const seedExpenses = () => Expense.bulkCreate(expenseData);

module.exports = seedExpenses;
