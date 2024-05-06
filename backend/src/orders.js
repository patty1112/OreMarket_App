import { Router } from "express";
import { ObjectId } from "mongodb";

const OrdersRouter = Router();

// Create a new order
OrdersRouter.post("/", async (req, res) => {
    const db = req.app.get("db");
    try {
        const result = await db.collection("orders").insertOne(req.body);
        res.status(201).json(result.insertedId);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

// Retrieve all orders
OrdersRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const orders = await db.collection("orders").find().toArray();
    res.json(orders);
});

// Update an order
OrdersRouter.put("/:id", async (req, res) => {
    const db = req.app.get("db");
    try {
        const updateResult = await db.collection("orders").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(updateResult);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

export default OrdersRouter;
