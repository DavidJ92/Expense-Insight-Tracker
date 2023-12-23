// flatpickr
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#dateInput", {
    dateFormat: "F j, Y",
    onChange: function (selectedDates, dateStr, instance) {
      // Update the hidden input with the selected date
      document.getElementById("date").value = dateStr;
    },
  });
});

// adding expenses and appending to list
document.addEventListener("DOMContentLoaded", function () {
  // Initialize an array to store expenses
  var expenses = loadExpenses();

  // event listener for add-expense-btn click
  document
    .getElementById("add-expense-btn")
    .addEventListener("click", function () {
      addExpense();
    });

  // function to add an expense to the list
  function addExpense() {
    // get user input values
    var date = document.getElementById("dateInput").value;
    var category = document.getElementById("categoryInput").value;
    var amount = document.getElementById("amountInput").value;

    // show if no date is selected
    if (!date.trim()) {
      alert("Please select a date.");
      return;
    }

    // show error if no amount is entered
    if (!amount.trim()) {
      alert("Please enter an amount.");
      return;
    }

    // expense object
    var expense = {
      date: date,
      category: category,
      amount: amount,
    };

    expenses.push(expense);
    saveExpenses(expenses);
    updateExpenseList();
  }

  // function to update expense list
  function updateExpenseList() {
    var expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    var totalAmount = 0;
    var monthData = {};

    // loop through the expenses array and create list items
    for (var i = 0; i < expenses.length; i++) {
      var expenseItem = document.createElement("li");
      expenseItem.textContent = `${expenses[i].date} - ${expenses[i].category}: $${expenses[i].amount}`;

      // extract amount from each user input
      var amount = parseFloat(expenses[i].amount);

      // Update aggregated data
      totalAmount += amount;

      // extract month and year only from each user input
      var expenseDate = new Date(expenses[i].date);
      var expenseMonth = expenseDate.getMonth() + 1; // 0-based month so +1 needed
      var expenseYear = expenseDate.getFullYear();

      // Update month-wise data
      var monthKey = `${expenseYear}-${expenseMonth}`;
      if (monthData[monthKey]) {
        monthData[monthKey].total += amount;
        monthData[monthKey].expenses.push(expenses[i]);
      } else {
        monthData[monthKey] = {
          total: amount,
          expenses: [expenses[i]],
        };
      }

      // create a delete button for each expense
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = createDeleteHandler(i);

      // append delete button to each daily expenses
      expenseItem.appendChild(deleteButton);

      // append the daily expenses to the expenseList
      expenseList.appendChild(expenseItem);
    }

    // store total daily expenses by month
    var monthlyTotals = Object.keys(monthData).map(function (key) {
      return { month: key, total: monthData[key].total };
    });

    console.log("Monthly Totals:", monthlyTotals);

    var totalMonthList = document.getElementById("totalMonthList");
    totalMonthList.innerHTML = ""; // replace totalMonthList with the new totalMonthList

    // loop through the monthlyTotals and create list items for montly expenses
    monthlyTotals.forEach(function (monthlyTotal) {
      var totalItem = document.createElement("li");

      var [year, month] = monthlyTotal.month.split("-");
      var monthDate = new Date(year, parseInt(month) - 1); // adjust back to 0-based month

      // format date as "Month Year"
      var formattedDate = monthDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      totalItem.textContent = `Total Amount for ${formattedDate}: $${monthlyTotal.total}`;

      // append  to the totalsList
      totalMonthList.appendChild(totalItem);
    });
  }

  // function to delete daily expenses
  function createDeleteHandler(index) {
    return function () {
      expenses.splice(index, 1);

      saveExpenses(expenses);

      updateExpenseList();

      updateChart();
    };
  }

  // function to save expenses to localStorage
  function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // function to load expenses from localStorage
  function loadExpenses() {
    var storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  // load expenses when the page loads
  updateExpenseList();
});

// if btn is clicked, render the homepage
const seeHomeBtn = document.querySelector("#see-home-btn");
seeHomeBtn.addEventListener("click", function () {
  window.location.href = "/";
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