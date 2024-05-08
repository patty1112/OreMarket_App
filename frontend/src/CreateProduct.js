import React, { useState } from 'react';

function CreateProduct() {
    // State to hold form data
    const [formData, setFormData] = useState({
        postedBy: '',
        productTitle: '',
        description: '',
        photo: '',  // Optional field, no need to require
        city: '',
        price: '',
        contact: ''
    });

    // State to hold success or failure message
    const [message, setMessage] = useState('');

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.productTitle || !formData.description || !formData.city || !formData.price || !formData.contact) {
            setMessage('Please fill in all required fields.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/products/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const result = await response.json();
                setMessage(`Product created successfully! Product ID: ${result.productId}`);
                setFormData({
                    productTitle: '',
                    description: '',
                    photo: '',
                    city: '',
                    price: '',
                    contact: ''
                });
            } else {
                throw new Error('Failed to create product');
            }
        } catch (error) {
            setMessage('Error creating product: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Create a New Product</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
            <input type="text" name="postedBy" placeholder="Posted By: (Name)" value={formData.postedBy} onChange={handleInputChange} required />
                <input type="text" name="productTitle" placeholder="Product Title" value={formData.productTitle} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
                <input type="text" name="photo" placeholder="Photo URL (optional)" value={formData.photo} onChange={handleInputChange} />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
                <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                <input type="text" name="contact" placeholder="Contact Details" value={formData.contact} onChange={handleInputChange} required />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
