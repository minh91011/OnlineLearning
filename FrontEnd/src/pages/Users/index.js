import React, { useState, useEffect } from 'react';
import './user.css'
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('all');

  useEffect(() => {
    axios.get('https://localhost:7296/api/User')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase()) && (role === 'all' || user.role === role);
  });

  const changeRole = async (userName, newRole) => {
      try{
        const response = await fetch("https://localhost:7296/api/User/role",{
          method: 'POST',
          body: JSON.stringify({
            username: userName,
            newrole: newRole
          }),
          headers:{
              'content-Type' : 'application/json'
          }
        });
        //const data = await response.text();
        const updatedUsers = users.map(user => {
          if (user.username === userName) {
            return {...user, role: newRole};
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
      }
      catch(error){
        console.log(error);
      }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  }
  return (
    <div>
      <h2>Users</h2>
      <div>
        <label htmlFor="search">Search:</label>
        <input class = "user-input" type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>
        <label htmlFor="role">Filter by role:</label>
        <select id="role" value={role} onChange={handleRoleChange}>
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <table class = "user-table">
        <thead>
          <tr>
            <th class = "user-th">User ID</th>
            <th class = "user-th">Username</th>
            <th class = "user-th">Role</th>
            <th class = "user-th">Image</th>
            <th class = "user-th">Email</th>
            <th class = "user-th">Fullname</th>
            <th class = "user-th">Date of Birth</th>
            <th class = "user-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.userId}>
              <td class = "user-td">{user.userId}</td>
              <td class = "user-td">{user.username}</td>
              <td class = "user-td">{user.role}</td>
              <td class = "user-td"><img class = "user-img" src={user.image} alt={user.username} /></td>
              <td class = "user-td">{user.email}</td>
              <td class = "user-td">{user.fullname}</td>
              <td class = "user-td">{formatDate(user.dob)}</td>
              <td class = "user-td">
                <select value={user.role} onChange={event => changeRole(user.username, event.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Users;