const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000

// Middleware
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Expense Tracker');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
