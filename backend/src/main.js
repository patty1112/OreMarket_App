import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import ProductsRouter from "./products.js";
import UsersRouter from "./users.js";
import ProductsRouter1212 from "./products1212.js";
import OrdersRouter from "./orders.js"; // Make sure this is correctly pointing to your new orders router file
import ReviewsRouter from "./reviews.js";

async function connect() {
	const client = new MongoClient("mongodb://localhost:27017");
	const connection = await client.connect();
	return connection.db("final-database");
}

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", ProductsRouter);
app.use("/users", UsersRouter);
// app.use("/products", ProductsRouter1212) // Ensure this does not conflict with your other product routes
app.use("/orders", OrdersRouter); // Use the orders router here
app.use("/reviews", ReviewsRouter);

const database = await connect();
app.set("db", database);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
