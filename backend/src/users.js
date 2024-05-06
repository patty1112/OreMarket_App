import { Router } from "express";
import { ObjectId } from "mongodb";

const UsersRouter = Router();

// Create a new user
UsersRouter.post("/signup", async (req, res) => {
    const db = req.app.get("db");
    try {
        const result = await db.collection("users").insertOne(req.body);
        res.status(201).json(result.insertedId);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

// Retrieve all users
UsersRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const users = await db.collection("users").find().toArray();
    res.json(users);
});

// Update a user
UsersRouter.put("/:id", async (req, res) => {
    const db = req.app.get("db");
    const updateResult = await db.collection("users").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json(updateResult);
});

// Delete a user
UsersRouter.delete("/:id", async (req, res) => {
    const db = req.app.get("db");
    await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).end();
});

export default UsersRouter;
