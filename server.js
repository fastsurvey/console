const express = require('express');
const path = require('path');

const app = express();
app.disable('x-powered-by');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname + '/dist')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;
