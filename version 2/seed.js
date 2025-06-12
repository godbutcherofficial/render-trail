// seed.js
const { Client } = require('pg');

// Configuration for connecting to the PostgreSQL database
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'costumers',
  password: 'Ramyasri@12',
  port: 5432,
});

// Function to seed the database with dummy data
async function seed() {
  try {
    // Connect to the PostgreSQL database
    await client.connect();

    // Loop to insert 50 records into the 'customers' table
    for (let i = 0; i < 50; i++) {
      const customerName = `Customer ${i}`;
      const age = Math.floor(Math.random() * 100); // Random age between 0 and 99
      const phone = '1234567890'; // Dummy phone number
      const location = `Location ${i}`;

      // SQL query to insert data into the 'customers' table
      const query = {
        text: 'INSERT INTO customers (customer_name, age, phone, location) VALUES ($1, $2, $3, $4)',
        values: [customerName, age, phone, location],
      };

      // Execute the SQL query
      await client.query(query);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection to the PostgreSQL database
    await client.end();
  }
}

// Call the seed function to populate the database with dummy data
seed();
