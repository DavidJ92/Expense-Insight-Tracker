//adding expense
const addFormHandler = async (event) => {
    event.preventDefault();
  
    const category = document.querySelector('#category').value.trim();
    const amount = document.querySelector('#amount').value.trim();
    const date = document.querySelector('#date').value.trim();
  
    if (category && amount && date) {
        const response = await fetch('/api/add-expense', {
          method: 'POST',
          body: JSON.stringify({ category: category, amount: amount, date: date }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          alert('Added to list!');
          document.location.replace('/');
        } else {
          alert('Failed to add. Please try again.');
        }
      }
    };
  
document.querySelector('.add-form').addEventListener('submit', addFormHandler);
  