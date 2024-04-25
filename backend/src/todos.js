import { Router } from "express";
import {ObjectId} from "mongodb"
const TodosRouter = Router();
TodosRouter.mergeParams = true;

TodosRouter.get("/:todoId", async (req, res) => {
	const db = req.app.get("db");
	const id = new ObjectId(req.params.todoId);

	console.log(id);
	const todos = await db.collection("todos").findOne({ _id:(id) });
    return res.json(todos);
});
TodosRouter.post("/new", async (req, res) => {
	const db = req.app.get("db");

	try {
		const result = await db.collection("todos").insertOne(req.body);
		console.log(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

export default TodosRouter;

