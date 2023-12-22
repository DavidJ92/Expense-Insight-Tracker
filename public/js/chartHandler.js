// Chart data
const monthNumberMap = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12
 };
 
 const userMonthlyExpenses = {
  'January': 500,
  'February': 750,
  'March': 600,
  // ... other months
 };
 
 // Function to render the chart
 function renderExpenseChart() {
  const ctx = document.getElementById('myChart').getContext('2d'); 
 
  // Assuming userMonthlyExpenses is an object with keys as month names and values as amounts
  const monthLabels = Object.keys(userMonthlyExpenses);
  const monthNumbers = monthLabels.map(month => monthNumberMap[month]);
 
  // Create Chart instance
  new Chart(ctx, {
     type: 'line',
     data: {
       labels: monthLabels,
       datasets: [{
         label: 'Amount Spent',
         data: Object.values(userMonthlyExpenses),
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
 
 // Function to add a new expense
 function addExpense(date, amount) {
  const monthName = new Date(date).toLocaleString('default', { month: 'long' });
  if (userMonthlyExpenses[monthName]) {
     userMonthlyExpenses[monthName] += amount;
  } else {
     userMonthlyExpenses[monthName] = amount;
  }
 
  renderExpenseChart();
 }
 
 // Example usage:
 const newExpenseDate = new Date('2023-02-25');
 const newExpenseAmount = 150;
 addExpense(newExpenseDate, newExpenseAmount);
 
 // Function to handle adding a new expense
 
 function addNewExpense() {
  const date = new Date(prompt('Enter the date of the expense (format: YYYY-MM-DD):'));
  const amount = parseFloat(prompt('Enter the amount of the expense:'));
  addExpense(date, amount);
 }
 
 // Example usage:
 addNewExpense();