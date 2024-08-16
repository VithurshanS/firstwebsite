const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'vithu' directory
app.use(express.static(path.join(__dirname, 'vithu')));

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vithu/bulbonoff.html'));
});

// Route to get courses data
app.get('/co', (req, res) => {
    db.query('SELECT * FROM course', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Error fetching courses');
            return;
        }
        res.json(results); // Send the data as JSON
    });
});

app.get('/instructors', (reqi,resk) => {
    db.query('SELECT * FROM instructor', (err, resu) => {
        if(err){
            return;
        }
        resk.json(resu);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
