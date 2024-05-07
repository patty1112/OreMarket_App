import { useState, useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import "./Listing.css";

export default function Listing2() {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);

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

    return (
        <>
            <Outlet />
            {product ? (
                <div className="product-details">
                    <h2>{product.productTitle}</h2>
                    <img src={product.photo} alt={product.productTitle} style={{ width: '100px', height: '100px' }} />
                    <p>Description: {product.description}</p>
                    <p>City: {product.city}</p>
                    <p>Price: ${product.price}</p>
                    <p>Contact: {product.contacts}</p>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </>
    );
}
