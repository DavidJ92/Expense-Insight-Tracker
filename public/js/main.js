let expenses = []; // Array to store expenses

// Function to render expenses
function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = ""; // Clear previous content

  expenses.forEach((expense) => {
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense-item");
    expenseDiv.innerHTML = `
      <h3>${expense.title}</h3>
      <p>Date: ${expense.date}</p>
      <p>Amount: ${expense.amount}</p>
      <p>Category: ${expense.category}</p>
      <p>Description: ${expense.description}</p>
    `;
    expenseList.appendChild(expenseDiv);
  });
}

// Function to handle form submission
function handleExpenseFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const title = document.getElementById("expenseTitle").value;
  const date = document.getElementById("expenseDate").value;
  const amount = document.getElementById("expenseAmount").value;
  const category = document.getElementById("expenseCategory").value;
  // const description = document.getElementById('expenseDescription').value;

  // Add the new expense to the expenses array
  expenses.push({ title, date, amount, category, description });

  // Render expenses
  renderExpenses();

  // Clear form fields after submission
  document.getElementById("expenseForm").reset();
}

// Wait for DOM content to load before executing code
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the expense form
  const expenseForm = document.getElementById("expenseForm");
  if (expenseForm) {
    expenseForm.addEventListener("submit", handleExpenseFormSubmit);
  }
});
