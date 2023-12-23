// flatpickr
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#dateInput", {
    dateFormat: "F j, Y", // Set the desired date format
    enableTime: false,   // Disable time selection if not needed
    altInput: true,      // Use an alternate input field for display
    altFormat: "F j, Y", // Format for the alternate input field
    onChange: function(selectedDates, dateStr, instance) {
      // Update the hidden input with the selected date
      document.getElementById("date").value = dateStr;
    }
  });
});

// adding expenses and appending to list
document.addEventListener("DOMContentLoaded", function () {
  // Initialize an array to store expenses
  var expenses = loadExpenses();

  // event listener for add-expense-btn click
  document.getElementById("add-expense-btn").addEventListener("click", function () {
    addExpense();
  });

  // function to add an expense to the list
  function addExpense() {
    // Get user input values
    var date = document.getElementById("dateInput").value;
    var category = document.getElementById("categoryInput").value;
    var amount = document.getElementById("amountInput").value;

    // error shows if no date is selected
  if (!date.trim()) {
    alert("Please select a date."); // Display an error alert
    return; // Stop execution if the date is empty
  }
  
    // error shows if no amount is entered
    if (!amount.trim()) {
      alert("Please enter an amount."); // Display an error alert
      return; // Stop execution if the amount is empty
    }

    // Create an object representing the expense
    var expense = {
      date: date,
      category: category,
      amount: amount
    };

    // Add the expense object to the expenses array
    expenses.push(expense);

    // Save expenses to localStorage
    saveExpenses(expenses);

    // Update the HTML list with the new expense
    updateExpenseList();
  }

  // Function to update the HTML list with expenses
  function updateExpenseList() {
    var expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = ""; // Clear existing list

    // Loop through the expenses array and create list items
    for (var i = 0; i < expenses.length; i++) {
      var expenseItem = document.createElement("li");
      expenseItem.textContent = `${expenses[i].date} - ${expenses[i].category}: $${expenses[i].amount}`;

      // Create a delete button for each expense
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = createDeleteHandler(i); // Create a closure to capture the current index

      // Append the delete button to the list item
      expenseItem.appendChild(deleteButton);

      // Append the list item to the expenseList
      expenseList.appendChild(expenseItem);
    }
  }

  // Function to handle the delete button click for a specific index
  function createDeleteHandler(index) {
    return function () {
      // Remove the expense at the specified index
      expenses.splice(index, 1);

      // Save the updated expenses to localStorage
      saveExpenses(expenses);

      // Update the HTML list with the new expense
      updateExpenseList();
    };
  }

  // Function to save expenses to localStorage
  function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Function to load expenses from localStorage
  function loadExpenses() {
    var storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  // Load expenses when the page loads
  updateExpenseList();
});

 // if see updated line chart btn is clicked, render the homepage
 const seeHomeBtn = document.querySelector("#see-home-btn");
 seeHomeBtn.addEventListener("click", function () {
   window.location.href = '/';
 });







//  // Function to update the monthly expenses array
// function updateMonthlyExpenses(date, amount) {
//   const month = date.slice(0, 7); // Extract the month from the date
 
//   if (userMonthlyExpenses[month]) {
//      userMonthlyExpenses[month] += parseFloat(amount);
//   } else {
//      userMonthlyExpenses[month] = parseFloat(amount);
//   }
//  }
 
//  // Function to render the monthly expense chart
//  function renderExpenseChart() {
//   const currentPage = window.location.pathname; // Get the current page URL
 
//   // Check if the current page is the home page
//   if (currentPage === '/') {
//      const ctx = document.getElementById('myChart').getContext('2d');
 
//      // Create Chart instance
//      new Chart(ctx, {
//        type: 'line',
//        data: {
//          labels: Object.keys(userMonthlyExpenses),
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
 
//  // Call the function to render the chart initially
//  renderExpenseChart();
 
//  // Function to handle adding a new expense
//  const addFormHandler = async (event) => {
//   event.preventDefault();
 
//   const date = document.querySelector('#date').value.trim();
//   const category = document.querySelector('#categories').value.trim();
//   const amount = document.querySelector('#amount').value.trim();
//   const description = document.querySelector('#description').value.trim();
 
//   if (date && category && amount) {
//        const response = await fetch('/api/expenses/add-expense', {
//            method: 'POST',
//            body: JSON.stringify({ date, category, amount }),
//            headers: { 'Content-Type': 'application/json' },
//        });
 
//        if (response.ok) {
//            alert('Expense added!');
//            // Fetch the updated expense list and append the new expense to the existing list
//            fetchAndAppendExpense();
//        } else {
//            alert('Failed to add expense. Please try again.');
//        }
//   }
//  };
 
//  document.querySelector("#add-expense-btn").addEventListener("click", addFormHandler);
 
//  // Function to fetch the newly added expense and append it to the list
//  const fetchAndAppendExpense = async () => {
//   try {
//        const response = await fetch('/api/expenses/latest'); // Endpoint to fetch the latest expense added
 
//        if (response.ok) {
//            const newExpense = await response.json();
//            // Append the new expense to the list
//            appendToList(newExpense);
 
//            // Update the monthly expenses array
//            updateMonthlyExpenses(newExpense.date, newExpense.amount);
 
//            // Render the updated chart
//            renderExpenseChart();
//        } else {
//            alert('Failed to fetch the updated expense list. Please try again.');
//        }
//   } catch (error) {
//        console.error('Error:', error);
//   }
//  };