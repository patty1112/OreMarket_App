import React, { useState } from 'react';
import "./VerifyUser.css"
import "./index.js"
function LoginPage({handleLoginSuccess}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Prepare data object to send
    const data = {
      username: username,
      password: password
    };
  
    // Make POST request with JSON data
    fetch(`http://localhost:3001/users/${data.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful login
        console.log(data); // You might want to do something with the response
        handleLoginSuccess();
      })
      .catch(error => {
        // Handle login error
        console.error('Error during login:', error);
      });
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login Page</h2>
        <form>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:  </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
      <div className="additional-info">
        {/* Additional information or content */}
        
      </div>
    </div>
  );
}

export default LoginPage;
