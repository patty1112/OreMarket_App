import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET /orders - Retrieve all orders
router.get('/', async (req, res) => {
  const db = req.app.get('db'); // Accessing the database instance
  try {
    const orders = await db.collection('orders').find({}).toArray(); // Assuming no user-specific filtering for simplicity
    res.status(200).json(orders);
  } catch (error) {
    console.error('Failed to retrieve orders:', error);
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
});
router.post('/', async (req, res) => {
  const db = req.app.get('db'); // Assuming the db instance is set on the app
  const { items, total } = req.body;

  try {
    // Create a new order in the MongoDB collection
    const result = await db.collection('orders').insertOne({
      items,
      total,
      createdAt: new Date() // Store the time at which the order was created
    });

    // Respond with success and the order ID
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});
// DELETE /orders/:id - Delete an order by ID
router.delete('/:id', async (req, res) => {
  const db = req.app.get('db');
  try {
      const result = await db.collection('orders').deleteOne({ _id: new ObjectId(req.params.id) });
      if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
      console.error('Failed to delete order:', error);
      res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
});

export default router;
