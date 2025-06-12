// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Form } from 'react-bootstrap';

function App() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('created_at');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [search, sort, page]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/customers', {
        params: { page, search, sort },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="container">
      <h1>Customer Records</h1>
      <Form>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by name or location"
            value={search}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Form.Group controlId="sort">
          <Form.Label>Sort by:</Form.Label>
          <Form.Control as="select" value={sort} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.date}</td>
              <td>{customer.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
      </Pagination>
    </div>
  );
}

export default App;
