// Sample data (replace this with your actual expense data)
const data = {
    expenses: [
      { title: 'Lunch', amount: 15.50, category: 'Food' },
      { title: 'Transportation', amount: 30.00, category: 'Travel' },
      // Add more expense objects as needed
    ]
  };
  
  // Compile the Handlebars template
  const source = document.getElementById('expense-template').innerHTML;
  const template = Handlebars.compile(source);
  
  // Render the template with the data
  const renderedHtml = template(data);
  
  // Add the rendered HTML to your page
  document.getElementById('expense-list').innerHTML = renderedHtml;
  