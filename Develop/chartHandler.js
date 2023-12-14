// chartHandler.js

// Sample data for monthly expenses (replace this with your logic)
const monthlyExpenses = {
    January: 1500,
    February: 2200,
    March: 1800,
    // ... Add more months and expenses as needed
  };
  
  // Function to render monthly expense chart
  function renderExpenseChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    // Create Chart instance
    const expenseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(monthlyExpenses),
        datasets: [{
          label: 'Monthly Expenses',
          data: Object.values(monthlyExpenses),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  
  // Call the function to render the chart
  renderExpenseChart();
  