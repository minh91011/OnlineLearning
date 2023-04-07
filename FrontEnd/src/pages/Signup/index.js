import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import './signup.css';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7296/api/User/signup", {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          rePassword,
          email,
          fullname,
          dob,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.text();
      if (data === "Sign Up successfully") {
        alert("Sign up success");
        navigate("/login");
      }
      else {
        alert(data)
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container">
    <form class = "signup-form" onSubmit={handleSubmit} method="post">
      <label class = "signup-label">
        Username:
        <input class = "signup-input"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label >
      <br />
      <label class = "signup-label">
        Password:
        <input class = "signup-input"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label class = "signup-label">
        Repassword:
        <input class = "signup-input"
          type="text"
          value={rePassword}
          onChange={(event) => setRePassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label class = "signup-label">
        Email:
        <input class = "signup-input"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label class = "signup-label">
        Fullname:
        <input class = "signup-input"
          type="text"
          value={fullname}
          onChange={(event) => setFullname(event.target.value)}
        />
      </label>
      <br />
      <label class = "signup-label">
        Date of birth:
        <input class = "signup-input"
          type="date"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
      </label>
      <br />
      <button class = "signup-button" type="submit">Submit</button>
    </form>
    </div>
  );
}