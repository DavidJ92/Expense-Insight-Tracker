// const { addExpense } = require('./addExpense');

// var expenses = [];

// // Function to add an expense
// function addExpense(date, category, amount) {
//   var expense = {
//     date: date,
//     category: category,
//     amount: amount,
//   };

//   expenses.push(expense);
//   updateExpenseList();
// }
// // function to update the expense list in monthly-expenses
// function updateExpenseList() {
//     var expenseList = document.getElementById("expenseList");
//     expenseList.innerHTML = "";

//     var totalAmount = 0;
//     var monthData = {};

//     // loop through the expenses array and create list items
//     for (var i = 0; i < expenses.length; i++) {
//       var expenseItem = document.createElement("li");
//       expenseItem.textContent = `${expenses[i].date} - ${expenses[i].category}: $${expenses[i].amount}`;

//       // extract amount from each user input
//       var amount = parseFloat(expenses[i].amount);

//       totalAmount += amount;

//       // extract month and year only from each user input
//       var expenseDate = new Date(expenses[i].date);
//       var expenseMonth = expenseDate.getMonth() + 1; // 0-based month so +1 needed
//       var expenseYear = expenseDate.getFullYear();

//       // if month exists, add to that total, otherwise, create new total for new month
//       var monthKey = `${expenseYear}-${expenseMonth}`;
//       if (monthData[monthKey]) {
//         monthData[monthKey].total += amount;
//         monthData[monthKey].expenses.push(expenses[i]);
//       } else {
//         monthData[monthKey] = {
//           total: amount,
//           expenses: [expenses[i]],
//         };
//       }

//       // append the daily expense to the expenseList
//       expenseList.appendChild(expenseItem);
//     }

//     // store total daily expenses by month
//     var monthlyTotals = Object.keys(monthData).map(function (key) {
//       return { month: key, total: monthData[key].total };
//     });

//     console.log("Monthly Totals:", monthlyTotals);

//     var totalMonthList = document.getElementsByClassName("total-amount");
//     totalMonthList.innerHTML = ""; // replace totalMonthList with the new totalMonthList

//     // loop through the monthlyTotals and create list items for monthly expenses
//     monthlyTotals.forEach(function (monthlyTotal) {
//       var totalItem = document.createElement("li");

//       var [year, month] = monthlyTotal.month.split("-");
//       var monthDate = new Date(year, parseInt(month) - 1); // adjust back to 0-based month

//       // format date as "Month Year"
//       var formattedDate = monthDate.toLocaleDateString("en-US", {
//         month: "long",
//         year: "numeric",
//       });

//       totalItem.textContent = `Total Amount for ${formattedDate}: $${monthlyTotal.total}`;

//       // append to the totalsList
//       totalMonthList.appendChild(totalItem);
//     });
//   }

//   module.exports = { addExpense };
