import React, { useState } from 'react';

function CreateProject() {
    // State to hold project title
    const [projectTitle, setProjectTitle] = useState('');
    // State to hold success or failure message
    const [message, setMessage] = useState('');

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { value } = e.target;
        setProjectTitle(value);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request to create project
            const response = await fetch('http://localhost:3001/project/new', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectTitle })
            });
            const data = await response.json();
            console.log('Project created:', data);
            // Set success message
            setMessage('Project created successfully!');
            // Clear project title after successful submission
            setProjectTitle('');
        } catch (error) {
            console.error('Error creating project:', error);
            // Set failure message
            setMessage('Error creating project');
        }
    };

    return (
        <div>
            <h2>Create a New Project</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="projectTitle">Project Title:</label>
                <input type="text" id="projectTitle" name="projectTitle" value={projectTitle} onChange={handleInputChange} required />
                <br />
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}

export default CreateProject;
