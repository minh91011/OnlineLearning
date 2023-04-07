import React, { useState } from "react";
import './profile.css';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  var currentUser = localStorage.getItem('user'); 
  var user = JSON.parse(currentUser);
  
  const _dob = new Date(user.dob);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [password, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    photoUrl: user.image,
    fullName: user.fullname,
    role: user.role,
    dob: _dob.toDateString()
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7296/api/User/changepassword", {
        method: 'POST',
        body: JSON.stringify({
          username: userData.username,
          password,
          newPassword,
          confirmNewPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.text();
      if (data === "Password updated successfully") {
        console.log(data);
        alert("Password updated successfully");
        navigate("/profile");
      }
      else {
        alert(data)
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user.image);
  return (
    <div className="container">
      <div className="user-info">
        <img class = "profile-img" src={user.image} alt="User avatar" />
        <h1>{userData.fullName}</h1>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
        <p>Date of Birth: {userData.dob}</p>
        <button className="profile-button" onClick={() => setShowChangePasswordForm(true)}>
          Change password
        </button>
        {showChangePasswordForm && (
          <form class = "profile-form" onSubmit={handleSubmit}>
            <label>
              Old Password:
              <input class = "profile-input"
                type="password"
                name="oldPassword"
                value={password}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label class = "profile-label">
              New Password:
              <input class = "profile-input"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label class = "profile-label">
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={confirmNewPassword}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button className="profile-button" type="submit">Save new password</button>
            <br/>
            <br/>
            <button className="profile-button" onClick={() => setShowChangePasswordForm(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
