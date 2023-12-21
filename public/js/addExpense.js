// addExpense.js

// Function to add monthly expense for the user
const addExpense = async (expense) => {
    try {
      const response = await fetch('/api/expenses/add-expense', {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const addedExpense = await response.json();
        fetchAndAppendExpense(); // Fetch the updated expense list and append the new expense to the existing list
        return addedExpense;
      } else {
        throw new Error('Failed to add expense. Please try again.');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };
  
  // Function to fetch the newly added expense and append it to the list
  const fetchAndAppendExpense = async () => {
    try {
      const response = await fetch('/api/expenses/latest'); // Endpoint to fetch the latest expense added
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
  
  // Event listener for the expense form submission
  document.querySelector('.add-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const date = document.querySelector('#date').value.trim();
    const category = document.querySelector('#categories').value.trim();
    const amount = document.querySelector('#amount').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (date && category && amount) {
      try {
        await addExpense({ date, category, amount, description });
        alert('Expense added!');
      } catch (error) {
        alert(error.message);
      }
    }
  });
  
  // Initially fetch and render the entire expense list on page load
  fetchAndAppendExpense();