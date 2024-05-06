import { Router } from 'express';

const ReviewsRouter = Router();

ReviewsRouter.use((req, res, next) => {
  req.db = req.app.get('db');
  next();
});

// POST /reviews - Create a new review
ReviewsRouter.post('/', async (req, res) => {
  const { username, productName, rating, description } = req.body;
  try {
    // Insert new review
    const result = await req.db.collection('reviews').insertOne({
      username,
      productName,
      rating,
      description
    });
    res.status(201).json({ message: 'Review created successfully', reviewId: result.insertedId });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
});

// GET /reviews/:productName - Retrieve all reviews for a specific product
ReviewsRouter.get('/:productName', async (req, res) => {
  try {
    const reviews = await req.db.collection('reviews').find({ productName: req.params.productName }).toArray();
    if (!reviews || reviews.length === 0) {
      return res.status(404).send('No reviews found for this product');
    }
    res.json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).send('Failed to get reviews');
  }
});

export default ReviewsRouter;