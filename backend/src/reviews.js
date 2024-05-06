import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get all reviews for a product
router.get('/:productId', async (req, res) => {
    const db = req.app.get('db');
    const reviews = await db.collection('reviews').find({ productId: new ObjectId(req.params.productId) }).toArray();
    res.json(reviews);
});

// Post a review
router.post('/', async (req, res) => {
    const db = req.app.get('db');
    const result = await db.collection('reviews').insertOne(req.body);
    res.status(201).json(result.insertedId);
});

export default router;
