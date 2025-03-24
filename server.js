console.log("🚀 server.js is running...");

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const dbPath = './db/users.db';

if (!fs.existsSync('./db')) fs.mkdirSync('./db');
if (!fs.existsSync(dbPath)) {
  const seedSQL = fs.readFileSync('./db/seed.sql', 'utf8');
  const dbInit = new sqlite3.Database(dbPath);
  dbInit.exec(seedSQL);
}

const db = new sqlite3.Database(dbPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 🔒 Validate input types and presence
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (row) return res.json({ success: true, message: 'Login successful' });
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  });
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
