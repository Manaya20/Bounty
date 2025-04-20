const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Bounty Application is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 