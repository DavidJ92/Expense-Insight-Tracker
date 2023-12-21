// User's monthly expenses data (replace this with the user's logic)
let userMonthlyExpenses = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};

// Function to add monthly expense for the user
export function addMonthlyExpense(month, amount) {
  userMonthlyExpenses[month] = amount;
}

// Function to render the monthly expense chart
export function renderExpenseChart() {
  const currentPage = window.location.pathname; // Get the current page URL

  // Check if the current page is the home page
  if (currentPage === "/") {
    const ctx = document.getElementById("myChart");

    // Create Chart instance
    new Chart(ctx, {
      type: "line",
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
          data: Object.values(userMonthlyExpenses),
          borderWidth: 1
        }]
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
}

// Export the functions to be used in other files if needed
export { addMonthlyExpense, renderExpenseChart };
