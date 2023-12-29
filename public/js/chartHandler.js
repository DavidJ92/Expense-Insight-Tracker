// if btn is clicked, render the add-expense
const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", function () {
  window.location.href = "/add-expense";
});

// User's monthly expenses data (replace this with the user's logic)
// let userMonthlyExpenses = {
//   January: 0,
//   February: 0,
//   March: 0,
//   April: 0,
//   May: 0,
//   June: 0,
//   July: 0,
//   August: 0,
//   September: 0,
//   October: 0,
//   November: 0,
//   December: 0
//  };

// Function to add monthly expense for the user
//  function addMonthlyExpense(month, amount) {
//   userMonthlyExpenses[month] = amount;
//  }

// Function to render the monthly expense chart
//  async function renderExpenseChart() {
//   const response = await fetch("/api/expenses");
//   console.log(response);

//   // Check if the current page is the home page
//   if (currentPage === '/') {
const ctx = document.getElementById("myChart").getContext("2d");

//      // Create Chart instance
//      new Chart(ctx, {
//        type: 'line',
//        data: {
//          labels: ['January',
//           'February',
//           'March',
//           'April',
//           'May',
//           'June',
//           'July',
//           'August',
//            'September',
//            'October',
//             'November',
//             'December'],
//          datasets: [{
//            label: 'Amount Spent',
//            data: Object.values(userMonthlyExpenses),
//            borderWidth: 1
//          }]
//        },
//        options: {
//          scales: {
//            y: {
//              beginAtZero: true
//            }
//          }
//        }
//      });
//   }
//  }

const monthNumberMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const userMonthlyExpenses = {
  January: 500,
  February: 750,
  March: 600,
  // ... other months
};

// Assuming userMonthlyExpenses is an object with keys as month names and values as amounts
const monthLabels = Object.keys(userMonthlyExpenses);
const monthNumbers = monthLabels.map((month) => monthNumberMap[month]);

// Create Chart instance
new Chart(ctx, {
  type: "line",
  data: {
    labels: monthLabels,
    datasets: [
      {
        label: "Amount Spent",
        data: Object.values(userMonthlyExpenses),
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function getAmountSpentForMonth(expenseArr, inputDate) {
  const targetMonth = inputDate.getMonth() + 1; // Month is 0-indexed, so add 1
  const expensesForMonth = expenseArr.filter(
    (exp) => exp.date.getMonth() + 1 === targetMonth,
  );

  // Calculate the total amount spent for the month
  const totalAmountSpent = expensesForMonth.reduce(
    (total, exp) => total + exp.amount,
    0,
  );

  return totalAmountSpent;
}

// Example usage:
const inputDate = new Date("2023-01-25");
const amountSpentForMonth = getAmountSpentForMonth(expenses, inputDate);
console.log(
  `Amount spent in ${inputDate.toLocaleString("en-US", {
    month: "long",
  })}: $${amountSpentForMonth}`,
);

// Call the function to render the chart
renderExpenseChart();

// Call the function to render the chart
renderExpenseChart();

// Function to handle adding a new expense
function addNewExpense(expenses, newExpense) {
  expenses.push(newExpense);
}

// Function to calculate the total amount spent for a given month
function getAmountSpentForMonth(expenseArr, inputDate) {
  const targetMonth = inputDate.getMonth() + 1; // Month is 0-indexed, so add 1
  const expensesForMonth = expenseArr.filter(
    (exp) => exp.date.getMonth() + 1 === targetMonth,
  );

  // Calculate the total amount spent for the month
  const totalAmountSpent = expensesForMonth.reduce(
    (total, exp) => total + exp.amount,
    0,
  );

  return totalAmountSpent;
}

// Function to render the expense chart
function renderExpenseChart() {
  const ctx = document.getElementById("myChart").getContext("2d");
  const monthNumberMap = {
    /* ... */
  };
  const monthLabels = expenses.map((exp) =>
    exp.date.toLocaleString("en-US", { month: "long" }),
  );
  const monthNumbers = monthLabels.map((month) => monthNumberMap[month]);
  const amountsSpent = expenses.map((exp) => exp.amount);

  // Create Chart instance
  new Chart(ctx, {
    type: "line",
    data: {
      labels: monthLabels,
      datasets: [
        {
          label: "Amount Spent",
          data: amountsSpent,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
