// backend/server.js

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000; // You can change this port as needed

// Create a pool for handling database connections
const pool = new Pool({
  user: 'postgres', // Database superuser
  host: 'localhost',
  database: 'customers',
  password: '2244',
  port: 5432, // Default PostgreSQL port
});






// Endpoint to fetch customer data
app.get('/customers', async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', sort = 'created_at' } = req.query;
    const offset = (page - 1) * limit;
    const query = `
      SELECT sno, customer_name, age, phone, location, 
             TO_CHAR(created_at, 'YYYY-MM-DD') AS date, 
             TO_CHAR(created_at, 'HH24:MI:SS') AS time
      FROM customers
      WHERE customer_name ILIKE $1 OR location ILIKE $1
      ORDER BY ${sort}
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [`%${search}%`, limit, offset]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
