import { useLoaderData, Outlet } from "react-router-dom";

async function loadProject(request) {
	const projectId = request.params.projectID;
	const response = await fetch(`http://localhost:3001/project/${projectId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
	return await response.json();
}

export default function Project() {
	const project = useLoaderData();
	return (
		<>
			<article>
				<h1>{project.projectTitle}</h1>
			</article>
			<Outlet />
		</>
	)
}

export { loadProject };