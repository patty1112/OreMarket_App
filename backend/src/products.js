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
