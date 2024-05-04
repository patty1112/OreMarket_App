import { Outlet } from "react-router-dom";
import './App.css';
import './styles.css'; // Import the new CSS file
import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
// We treat `Layout` as the layout of our application.
// The `<Outlet />` delegates renders to the matching child route, if one exists.
function Layout() {
  const [todoDescription, setTodoDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('GET'); // State for selected HTTP method
  const [id, setId] = useState('');
  // Event handler for selecting HTTP method
  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  // Event handler for updating TODO description
  const handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  // Event handler for updating completed status
  const handleCompletedChange = () => {
    setCompleted(!completed);
  };

  // Event handler for updating ID
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handleSubmit = () => {
    // Reset fields after submission (optional)
    if (selectedMethod === 'GET') {
      // Perform the GET request to fetch data
      fetch(`http://localhost:3001/${id}`)
        .then(response => response.json())
        .then(data => {
          // Handle the data fetched from the server
          console.log('Data fetched:', data);
          // You can update state or perform any other action here
        })
        .catch(error => {
          // Handle any errors that occur during the request
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
      
      <Outlet />
    </>
  );
}

export default Layout;

