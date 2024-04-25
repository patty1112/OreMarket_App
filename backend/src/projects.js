import { Router } from "express";
import { ObjectId } from "mongodb";
import TodosRouter from "./todos.js";

const ProjectsRouter = Router();

ProjectsRouter.use("/:projectId/todos", TodosRouter);

ProjectsRouter.get("/", async (req, res) => {
	const db = req.app.get("db");
	const todos = await db.collection("projects").find().toArray();
  	return res.json(todos);
});

ProjectsRouter.get("/:id", async (req, res) => {
    const db = req.app.get("db");
	const id = new ObjectId(req.params.id).toString();
    const todos = await db.collection("todos").find({ projectID:(id) }).toArray();
    return res.json(todos);
});

ProjectsRouter.post("/new", async (req, res) => {
	const db = req.app.get("db");

	try {
		console.log(req);
		const result = await db.collection("projects").insertOne(req.body);
		console.log(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

ProjectsRouter.put("/:id", async (req, res) => {
	req.body._id = new ObjectId(req.params.id);
	const db = req.app.get("db");
	try {
		const updateResult = await db.collection("projects").update({ _id: new ObjectId(req.params.id) }, req.body);
		console.info(updateResult);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}

	return res.status(200).end();
});

ProjectsRouter.delete("/:id", async (req, res) => {
	const db = req.app.get("db");
	try {
		await db.collection("projects").deleteOne({ _id: new ObjectId(req.params.id) });
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}

	return res.status(200).end();
});

export default ProjectsRouter;

