import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Listing.css";

export default function Listing() {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            const result = await fetch(`http://localhost:3001/products/${productID}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await result.json();
            setProduct(res); // Assuming `res` is the product object
        }

        loadProduct();
    }, [productID]);

    const addToCart = (productToAdd) => {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        const existingProductIndex = cart.findIndex(item => item._id === productToAdd._id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1; // Increment quantity
        } else {
            productToAdd.quantity = 1; // Set initial quantity
            cart.push(productToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart'); // Optionally navigate to cart page immediately after adding
    };

    return (
        <>
            {product ? (
                <div className="product-details">
                    <h2>{product.productTitle}</h2>
                    <img src={product.photo} alt={product.productTitle} style={{ width: '100px', height: '100px' }} />
                    <p>Description: {product.description}</p>
                    <p>City: {product.city}</p>
                    <p>Price: ${product.price}</p>
                    <p>Contact: {product.contacts}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </>
    );
}
