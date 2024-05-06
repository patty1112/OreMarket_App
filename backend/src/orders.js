import { Router } from 'express';
import { ObjectId } from 'mongodb';

const OrdersRouter = Router();

OrdersRouter.use((req, res, next) => {
  req.db = req.app.get('db');
  next();
});

// POST /orders - Create a new order
OrdersRouter.post('/', async (req, res) => {
  const { username, productName, quantity } = req.body;
  try {
    // Insert new order
    const result = await req.db.collection('orders').insertOne({
      username,
      productName,
      quantity
    });
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// GET /orders/:id - Retrieve a single order by ID
OrdersRouter.get('/:id', async (req, res) => {
  try {
    const order = await req.db.collection('orders').findOne({ _id: new ObjectId(req.params.id) });
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).send('Failed to get order');
  }
});

// PUT /orders/:id - Update an order
OrdersRouter.put('/:id', async (req, res) => {
  const { username, productName, quantity } = req.body;
  try {
    const updateResult = await req.db.collection('orders').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { username, productName, quantity } }
    );
    if (updateResult.modifiedCount === 0) {
      return res.status(404).send('Order not found or no updates made');
    }
    res.send('Order updated successfully');
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).send('Failed to update order');
  }
});

export default OrdersRouter;

