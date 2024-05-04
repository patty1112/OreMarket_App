import { Outlet } from "react-router-dom";
import './App.css';
import './styles.css'; // Import the new CSS file
import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

function Layout() {
  const [todoDescription, setTodoDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [id, setId] = useState('');

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  const handleCompletedChange = () => {
    setCompleted(!completed);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedMethod === 'GET') {
      fetch(`http://localhost:3001/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Data fetched:', data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    setTodoDescription('');
    setCompleted(false);
    setId('');
  };

  return (
    <>
      <h1>Ore Market</h1>
      <div className="layout-container">
        <div className="column">
          {/* Content for the first column */}
          <h2>Buy and Sell Items!</h2>

        </div>
        <div className="column">
          {/* Content for the second column */}
          <h2>Make Connections and Friends...</h2>
        </div>
      </div>
    </>
  );
}

export default Layout;

