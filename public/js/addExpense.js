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

