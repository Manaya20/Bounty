const express = require('express');
const path = require('path');
const app = express();

// Use the port provided by Elastic Beanstalk or default to 8081
const port = process.env.PORT || 8081;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Bounty Application is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 