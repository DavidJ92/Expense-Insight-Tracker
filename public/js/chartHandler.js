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
  'April': 1000,
  'May': 1200,
  'June': 900,
  'July': 1100,
  'August': 800,
  'September': 1050,
  'October': 0,
  'November': 0,
  'December': 0
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