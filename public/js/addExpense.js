let addExpenseForm = document.querySelector('#addExpenseForm');
let expenseAmount = document.querySelector('#expenseAmount');
let date = new Date();

addExpenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    // Store the data in the browser's local storage
    let monthlyExpenses = JSON.parse(localStorage.getItem('monthlyExpenses')) || {};

    if (!monthlyExpenses[currentYear]) {
        monthlyExpenses[currentYear] = {};
    }

    if (!monthlyExpenses[currentYear][currentMonth]) {
        monthlyExpenses[currentYear][currentMonth] = 0;
    }

    monthlyExpenses[currentYear][currentMonth] += parseFloat(expenseAmount.value);
    localStorage.setItem('monthlyExpenses', JSON.stringify(monthlyExpenses));

    // Clear the input field
    expenseAmount.value = '';
});