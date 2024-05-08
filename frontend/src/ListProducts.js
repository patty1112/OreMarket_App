import { useLoaderData, Link } from "react-router-dom";
import './ListProducts.css'; // Ensure the CSS file is imported

async function listProducts() {
    const response = await fetch('http://localhost:3001/products', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export default function Listing2() {
    const list = useLoaderData();

    return (
        <>
            <h2>List of all products:</h2> {/* This ensures the heading is on top */}
            <div className="product-listing">
                {list.map((item) => (
                    <div key={item._id} className="product-item">
                        <Link to={`/products/${item._id}`}>
                            <img src={item.photo} alt={item.productTitle} className="product-image" />
                            <div className="product-details">
                                <p><strong>Title:</strong> {item.productTitle}</p>
                                <p><strong>Price:</strong> ${item.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}


export { listProducts };
