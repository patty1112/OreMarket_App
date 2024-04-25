import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './LoadTodo.css'
async function loadSingleTodo(projectID, todoId) {
	try {
		const response = await fetch(
			`http://localhost:3001/project/${projectID}/todos/${todoId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching todo:", error);
		return null;
	}
}

export default function SingleTodo() {
	const { projectID, todoId } = useParams();
	const [todo, setTodo] = useState(null);

	useEffect(() => {
		const fetchTodo = async () => {
			const loadedTodo = await loadSingleTodo(projectID, todoId);
			setTodo(loadedTodo);
		};

		fetchTodo();
	}, [projectID, todoId]);

	return (
		<div className="todo-box"> {/* Apply todo-box class */}
			{todo ? (
				<>
					<br></br>
					<h2>Todo Title:{todo.title}</h2>
					<p>Todo Description: {todo.description}</p>
					<label htmlFor="completedCheckbox">
						Completed:{" "}
						<input type="checkbox" checked={todo.completed} />
					</label>
				</>
			) : (
				<p>Loading todo...</p>
			)}
		</div>
	);
}
