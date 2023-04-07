import React from 'react';
import { Link } from 'react-router-dom';
import './admin.scss';

function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <br/>
      <button class = "admin-button"><Link to="/users">View all users</Link></button>
      <br/>
      <br/>
      <button class = "admin-button"><Link to="/transaction">View transactions</Link></button>
    </div>
  );
}

export default Admin;