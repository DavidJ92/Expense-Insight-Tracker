// Import the function to update monthly expenses from chartHandler.js
import { addMonthlyExpense } from './chartHandler.js';

// Function to handle form submission for adding expenses
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

      // Convert the amount to a number
      const expenseAmount = parseFloat(amount);
      
      // Extract the month from the date (assuming date format is MM/DD/YYYY)
      const month = date.split('/')[0];

      // Update the monthly expenses after a new expense is added
      addMonthlyExpense(month, expenseAmount);
    } else {
      alert('Failed to add expense. Please try again.');
    }
  }
};

// Function to fetch the newly added expense and append it to the list
const fetchAndAppendExpense = async () => {
  try {
    const response = await fetch('/api/expenses/latest');
    if (response.ok) {
      const expense = await response.json();
      appendExpenseToList(expense);
    } else {
      console.error('Failed to fetch the latest expense');
    }
  } catch (error) {
    console.error('Error fetching the latest expense:', error);
  }
};

// Function to append the expense to the existing list
const appendExpenseToList = (expense) => {
  const listContainer = document.querySelector('.list-details ul');
  const listItem = document.createElement('li');
  listItem.textContent = `${expense.date} - ${expense.category} - ${expense.amount} - ${expense.description}`;
  listContainer.appendChild(listItem);
};

// Initially fetch and render the entire expense list on page load
fetchAndAppendExpense();

// Event listener for form submission
document.querySelector('.add-form').addEventListener('submit', addFormHandler);
