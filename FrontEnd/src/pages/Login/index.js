import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import './Login.css';
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const login = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch("https://localhost:7296/api/User/login", requestOptions)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(result => {
        console.log(result.token);
        localStorage.setItem("accessToken", result.token)
        localStorage.setItem("username", username);
        const userRequestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        const userUrl = `https://localhost:7296/api/User/getUserByToken?token=${result.token}`;
        fetch(userUrl, userRequestOptions)
          .then(response => {
            return response.json()
          })
          .then(user => {
            
            // Lưu object user vào localStorage
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/');
          })
      })
      .catch(error => {
        setError("Invalid username or password");
      });
  }
  return (
    <div className="container">

      <form>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={setParams}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={setParams}
          />
        </div>
        <button type="button" className="btn" onClick={login}>
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}