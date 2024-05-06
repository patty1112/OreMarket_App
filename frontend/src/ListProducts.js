import { useLoaderData, Link } from "react-router-dom";
import './ListProducts.css'; // Import the CSS file

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
      <h2>List of all products:</h2>
      {list.map((item) => (
        <article key={item._id}>
          <Link to={`/product/${item._id}`} className="link-box">
            <p>{item.productTitle}</p>
          </Link>
        </article>
      ))}
    </>
  );
}

export { listProducts };
