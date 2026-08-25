const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and text payloads
app.use(express.json());
app.use(express.text({ type: '*/*' }));

// Catch-all route to handle any incoming HTTP method (GET, POST, PUT, etc.)
app.all('*', (req, res) => {
    console.log(`\n--- NEW REQUEST RECEIVED [${new Date().toISOString()}] ---`);
    console.log(`Method: ${req.method}`);
    console.log(`Path:   ${req.path}`);
    
    console.log('\n--- HEADERS ---');
    console.log(JSON.stringify(req.headers, null, 2));

    console.log('\n--- QUERY PARAMETERS ---');
    console.log(JSON.stringify(req.query, null, 2));

    console.log('\n--- BODY PAYLOAD ---');
    console.log(typeof req.body === 'object' ? JSON.stringify(req.body, null, 2) : req.body || '[Empty Body]');
    
    console.log('------------------------------------------------\n');

    // Respond back to the sender
    res.status(200).json({ status: 'success', message: 'Webhook received' });
});

app.listen(PORT, () => {
    console.log(`Webhook tester server running on port ${PORT}`);
});
