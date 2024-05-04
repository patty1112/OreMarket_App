import React, { useState } from 'react';
import "./CreateUser.css"
function SignUp() {
    // State to hold user signup data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to hold success or failure message
    const [message, setMessage] = useState('');

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request to create new user
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            console.log('User signed up:', data);
            // Set success message
            setMessage('User signed up successfully!');
            // Clear form fields after successful submission
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error signing up:', error);
            // Set failure message
            setMessage('Error signing up');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Sign Up</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleInputChange} required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="info-container">
                <h3>Additional Information</h3>
                <p>Here you can add any additional information or content you want to display in the right column.</p>
            </div>
        </div>
    );
}

export default SignUp;
