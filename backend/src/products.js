import { Router } from "express";
import { ObjectId } from "mongodb";


const ProjectsRouter = Router();



ProjectsRouter.get("/", async (req, res) => {
	const db = req.app.get("db");
	const todos = await db.collection("products").find().toArray();
  	return res.json(todos);
});

ProjectsRouter.get("/:id", async (req, res) => {
    const db = req.app.get("db");
    const id = new ObjectId(req.params.id);
    try {
        const product = await db.collection("products").findOne({_id: id});
        if (!product) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

ProjectsRouter.post("/new", async (req, res) => {
    const db = req.app.get("db");
    const { productTitle, description, photo, city, price, contact } = req.body;

    try {
        const result = await db.collection("products").insertOne({
            productTitle,
            description,
            photo,
            city,
            price,
            contact
        });
        res.status(201).json({ message: 'Product created successfully', productId: result.insertedId });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
});


ProjectsRouter.put("/:id", async (req, res) => {
	req.body._id = new ObjectId(req.params.id);
	const db = req.app.get("db");
	try {
		const updateResult = await db.collection("products").update({ _id: new ObjectId(req.params.id) }, req.body);
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
		await db.collection("products").deleteOne({ _id: new ObjectId(req.params.id) });
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}

	return res.status(200).end();
});

export default ProjectsRouter;

