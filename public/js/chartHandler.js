// chartHandler.js

// User's monthly expenses data
let userMonthlyExpenses = {
  January: 200,
  February: 300,
  March: 400,
  April: 500,
  May: 600,
  June: 700,
  July: 800,
  August: 900,
  September: 1000,
  October: 1100,
  November: 1200,
  December: 1300
};

// Function to render the monthly expense chart
document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('myChart').getContext('2d');

  // Create Chart instance
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(userMonthlyExpenses), // Use the months as labels
      datasets: [{
        label: 'Amount Spent',
        data: Object.values(userMonthlyExpenses), // Use the expense amounts as data
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
});