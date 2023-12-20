//adding expense
const addExpenseHandler = async (event) => {
    event.preventDefault();
  
    const date = document.querySelector('#date').value.trim();
    const category = document.querySelector('#category').value.trim();
    const amount = document.querySelector('#amount').value.trim();
    
    if (date && category && amount ) {
        const response = await fetch('/api/expenses/add-expense', {
          method: 'POST',
          body: JSON.stringify({ category, amount, date }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          alert('Added to list!');
          document.location.replace('/add-expense');
        } else {
          alert('Failed to add expense.');
        }
      }
    };
  
document.querySelector('.add-form').addEventListener('submit', addExpenseHandler);