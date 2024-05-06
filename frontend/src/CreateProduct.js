import React, { useState } from 'react';

function CreateProduct() {
    // State to hold product title
    const [productTitle, setProductTitle] = useState('');
    // State to hold success or failure message
    const [message, setMessage] = useState('');

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { value } = e.target;
        setProductTitle(value);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request to create product
            const response = await fetch('http://localhost:3001/products/new', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productTitle })
            });
            const data = await response.json();
            console.log('Product created:', data);
            // Set success message
            setMessage('Product created successfully!');
            // Clear product title after successful submission
            setProductTitle('');
        } catch (error) {
            console.error('Error creating product:', error);
            // Set failure message
            setMessage('Error creating product');
        }
    };

    return (
        <div>
            <h2>Create a New Product</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="productTitle">Product Title:</label>
                <input type="text" id="productTitle" name="productTitle" value={productTitle} onChange={handleInputChange} required />
                <br />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
