// Example usage:
const inputDate = new Date('2023-01-25');
const amountSpentForMonth = getAmountSpentForMonth(expenses, inputDate);
console.log(`Amount spent in ${inputDate.toLocaleString('en-US', { month: 'long' })}: $${amountSpentForMonth}`);

// Call the function to render the chart
renderExpenseChart();

// Function to handle adding a new expense
function addNewExpense(expenses, newExpense) {
 expenses.push(newExpense);
}

// Function to calculate the total amount spent for a given month
function getAmountSpentForMonth(expenseArr, inputDate) {
 const targetMonth = inputDate.getMonth() + 1; // Month is 0-indexed, so add 1
 const expensesForMonth = expenseArr.filter(exp => exp.date.getMonth() + 1 === targetMonth);

 // Calculate the total amount spent for the month
 const totalAmountSpent = expensesForMonth.reduce((total, exp) => total + exp.amount, 0);

 return totalAmountSpent;
}

// Function to render the expense chart
function renderExpenseChart() {
 const ctx = document.getElementById('myChart').getContext('2d');
 const monthNumberMap = { /* ... */ };
 const monthLabels = expenses.map(exp => exp.date.toLocaleString('en-US', { month: 'long' }));
 const monthNumbers = monthLabels.map(month => monthNumberMap[month]);
 const amountsSpent = expenses.map(exp => exp.amount);

 // Create Chart instance
 new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Amount Spent',
        data: amountsSpent,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
 });
}