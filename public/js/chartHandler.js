// Sample data for monthly expenses (replace this with your logic)
const monthlyExpenses = {
    January: 1500,
    February: 2200,
    March: 1800,
    April: 1200,
    May: 2000,
    June: 2500,
    July: 2200,
    August: 1900,
    September: 1800,
    October: 2800,
    November: 2600,
    December: 2200
  };
  
  // Function to render the monthly expense chart
  function renderExpenseChart() {
    const currentPage = window.location.pathname; // Get the current page URL
  
    // Check if the current page is the home page
    if (currentPage === '/Home') {
      const ctx = document.getElementById('myChart');
  
      // Create Chart instance
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January',
           'February', 
           'March', 
           'April', 
           'May', 
           'June', 
           'July', 
           'August',
            'September', 
            'October',
             'November', 
             'December'],
          datasets: [{
            label: 'Amount Spent',
            data: Object.values(monthlyExpenses),
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
  }
  
  // Call the function to render the chart
  renderExpenseChart();
  