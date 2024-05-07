import React, { useState, useEffect } from 'react';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const cancelOrder = (orderId) => {
        fetch(`http://localhost:3001/orders/${orderId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }
            return response.json();
        })
        .then(() => {
            setOrders(orders.filter(order => order._id !== orderId)); // Update state to remove the deleted order
            alert('Order cancelled successfully');
        })
        .catch(error => alert('Error cancelling order: ' + error.message));
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <h3>Order ID: {order._id}</h3>
                            <p>Total: ${order.total}</p>
                            <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                        </li>
                    ))}
                </ul>
            ) : <p>No orders found.</p>}
        </div>
    );
}

export default MyOrders;
