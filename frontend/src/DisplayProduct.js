import { useLoaderData } from "react-router-dom";

async function loadProduct(request) {
    const productId = request.params.productID;
    const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export default function Product() {
    const product = useLoaderData();
    return (
        <>
            <article>
                <h1>{product.productTitle}</h1>
                <img src={product.photo} alt={product.productTitle} />
                <p>Description: {product.description}</p>
                <p>City: {product.city}</p>
                <p>Price: ${product.price}</p>
                <p>Contact: {product.contact}</p>
            </article>
        </>
    )
}

export { loadProduct };
