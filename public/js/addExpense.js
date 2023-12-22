// Function to update the monthly expenses array
function updateMonthlyExpenses(date, amount) {
  const month = date.slice(0, 7); // Extract the month from the date
 
  if (userMonthlyExpenses[month]) {
     userMonthlyExpenses[month] += parseFloat(amount);
  } else {
     userMonthlyExpenses[month] = parseFloat(amount);
  }
 }
 
 // Function to render the monthly expense chart
 function renderExpenseChart() {
  const currentPage = window.location.pathname; // Get the current page URL
 
  // Check if the current page is the home page
  if (currentPage === '/') {
     const ctx = document.getElementById('myChart').getContext('2d');
 
     // Create Chart instance
     new Chart(ctx, {
       type: 'line',
       data: {
         labels: Object.keys(userMonthlyExpenses),
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
 }
 
 // Call the function to render the chart initially
 renderExpenseChart();
 
 // Function to handle adding a new expense
 const addFormHandler = async (event) => {
  event.preventDefault();
 
  const date = document.querySelector('#date').value.trim();
  const category = document.querySelector('#categories').value.trim();
  const amount = document.querySelector('#amount').value.trim();
  const description = document.querySelector('#description').value.trim();
 
  if (date && category && amount) {
       const response = await fetch('/api/expenses/add-expense', {
           method: 'POST',
           body: JSON.stringify({ date, category, amount }),
           headers: { 'Content-Type': 'application/json' },
       });
 
       if (response.ok) {
           alert('Expense added!');
           // Fetch the updated expense list and append the new expense to the existing list
           fetchAndAppendExpense();
       } else {
           alert('Failed to add expense. Please try again.');
       }
  }
 };
 
 document.querySelector('.add-form').addEventListener('submit', addFormHandler);
 
 // Function to fetch the newly added expense and append it to the list
 const fetchAndAppendExpense = async () => {
  try {
       const response = await fetch('/api/expenses/latest'); // Endpoint to fetch the latest expense added
 
       if (response.ok) {
           const newExpense = await response.json();
           // Append the new expense to the list
           appendToList(newExpense);
 
           // Update the monthly expenses array
           updateMonthlyExpenses(newExpense.date, newExpense.amount);
 
           // Render the updated chart
           renderExpenseChart();
       } else {
           alert('Failed to fetch the updated expense list. Please try again.');
       }
  } catch (error) {
       console.error('Error:', error);
  }
 };