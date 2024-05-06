import { useLoaderData, Outlet } from "react-router-dom";

async function loadProduct(request) {
	const productId = request.params.productID;
	const response = await fetch(`http://localhost:3001/product/${productId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
	return await response.json();
}

export default function Product() {
	const product = useLoaderData();
	return (
		<>
			<article>
				<h1>{product.productTitle}</h1>
			</article>
			<Outlet />
		</>
	)
}

export { loadProduct };