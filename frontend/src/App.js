import React, { useState } from 'react';
import './App.css';
import Todo from "./Todo.js"; // Importing the Todo class/object



function App() {
  // State variables for TODO description, completed status, and ID
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

  // Event handler for submitting the TODO
  const handleSubmit = () => {
    // Reset fields after submission (optional)
    
    setTodoDescription('');
    setCompleted(false);
    setId('');
  };

  return (
    <div className="container"> {/* Added container class */}
      <h1>TODO App</h1>
      <div>
        {/* Dropdown for selecting HTTP method */}
        <select value={selectedMethod} onChange={handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        {/* Number input for ID */}
        <input
          type="number"
          value={id}
          onChange={handleIdChange}
          placeholder="Enter ID"
        />
      </div>
      <div>
        {/* Textbox for TODO description */}
        <input
          type="text"
          value={todoDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter TODO description"
        />
      </div>
      <div>
        {/* Checkbox for completed status */}
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChange}
          />
        </label>
      </div>
      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <p>TODO Description: {todoDescription}</p>
        <p>Completed: {completed ? 'Yes' : 'No'}</p>
        <p>Selected Method: {selectedMethod}</p>
        <p>ID: {id}</p>
      </div>
    </div>
  );
}
export default App;

