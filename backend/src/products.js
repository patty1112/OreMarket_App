import { Router } from 'express';

const ProductsRouter = Router();

ProductsRouter.use((req, res, next) => {
  req.db = req.app.get('db'); 
  next();
});

// POST /products - Create a new product
ProductsRouter.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    // Insert new product
    const result = await req.db.collection('products').insertOne({
      name,
      description
    });
    res.status(201).json({ message: 'Product created successfully', productId: result.insertedId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// GET /products/:name - Retrieve a single product by name
ProductsRouter.get('/:name', async (req, res) => {
  try {
    const product = await req.db.collection('products').findOne({ name: req.params.name });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).send('Failed to get product');
  }
});

// PUT /products/:id - Update a product
ProductsRouter.put('/:id', async (req, res) => {
  const updates = req.body;
  try {
    const result = await req.db.collection('products').updateOne({ _id: req.params.id }, { $set: updates });
    if (result.modifiedCount === 0) {
      return res.status(404).send('Product not found or no updates made');
    }
    res.send('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Failed to update product');
  }
});

// DELETE /products/:id - Delete a product
ProductsRouter.delete('/:id', async (req, res) => {
  try {
    const result = await req.db.collection('products').deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Failed to delete product');
  }
});

export default ProductsRouter;
=======
import { Router } from "express";
import { ObjectId } from "mongodb";

const ProductsRouter = Router();

// Create a new product
ProductsRouter.post("/", async (req, res) => {
    const db = req.app.get("db");
    try {
        const result = await db.collection("products").insertOne(req.body);
        res.status(201).json(result.insertedId);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

// Retrieve all products
ProductsRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const products = await db.collection("products").find().toArray();
    res.json(products);
});

// Update a product
ProductsRouter.put("/:id", async (req, res) => {
    const db = req.app.get("db");
    try {
        const updateResult = await db.collection("products").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(updateResult);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

// Delete a product
ProductsRouter.delete("/:id", async (req, res) => {
    const db = req.app.get("db");
    await db.collection("products").deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).end();
});

export default ProductsRouter;
