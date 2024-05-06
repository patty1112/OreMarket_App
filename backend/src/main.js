import express from "express";
import cors from "cors";
import ProjectsRouter from "./projects.js";
import TodosRouter from "./todos.js";
import { MongoClient } from "mongodb";
import UsersRouter from "./users.js";

async function connect() {
	const client = new MongoClient("mongodb://localhost:27017");
	const connection = await client.connect();
	return connection.db("final-database");
}

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/project", ProjectsRouter);
app.use("/todos", TodosRouter);
app.use("/users", UsersRouter)

const database = await connect();
app.set("db", database);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
