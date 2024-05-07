import React, { useState, useEffect } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const items = JSON.parse(cart);
            setCartItems(items);
            calculateTotal(items);
        }
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const deleteItem = (index) => {
        let updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const handlePurchase = async () => {
        try {
            const response = await fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cartItems,
                    total: totalPrice
                })
            });
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            const data = await response.json();
            alert(`Order placed successfully! Order ID: ${data.orderId}`);
            // Clear cart after purchase
            setCartItems([]);
            localStorage.setItem('cart', JSON.stringify([]));
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. ' + error.message);
        }
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {error && <p>Error: {error}</p>}
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <h3>{item.productTitle} - Quantity: {item.quantity}</h3>
                                <p>Price: ${item.price}</p>
                                <button onClick={() => deleteItem(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={handlePurchase} disabled={loading}>
                        {loading ? 'Processing...' : 'Purchase'}
                    </button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
