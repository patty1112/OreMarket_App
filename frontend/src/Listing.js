import { useState, useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import "./Listing.css";

export default function Listing2() {
    const { projectID } = useParams();
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        async function loadTodos() {
            const result = await fetch(`http://localhost:3001/project/${projectID}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await result.json();
            setTodoList(res); // Assuming `res` is an array of todos
        }

        loadTodos();
    }, [projectID]);

    return (
        <>
			<Outlet />
            {projectID && (
                <Link to={`/project/${projectID}/todo/new`}>
                    <button>New Todo</button>
                </Link>
            )}
            <h2>All Todos:</h2>
            {todoList.map((item) => (
                <div className="listing-box" key={item._id}>
                    {/* Apply the CSS class to wrap the component */}
                    <article>
                        <Link to={`todo/${item._id}`}>
                            <h3>{item._id}</h3>
                        </Link>
						<p>{item.title}</p>
                        <p>{item.description}</p>
						<p>{item.projectID}</p>
                    </article>
                </div>
            ))}
        </>
    );
}
