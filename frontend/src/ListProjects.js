import { useLoaderData, Link } from "react-router-dom";
import './ListProjects.css'; // Import the CSS file

async function listProjects() {
    const response = await fetch('http://localhost:3001/project', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export default function Listing2() {
  const list = useLoaderData();

  return (
    <>
      <h2>List of all projects:</h2>
      {list.map((item) => (
        <article key={item._id}>
          <Link to={`/project/${item._id}`} className="link-box">
            <p>{item.projectTitle}</p>
          </Link>
        </article>
      ))}
    </>
  );
}

export { listProjects };
