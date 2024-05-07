import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// POST /orders - Create a new order
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

export default router;
