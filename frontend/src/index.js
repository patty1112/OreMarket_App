import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import Listing from "./Listing";
import LoadTodo from "./LoadTodo";
import ListProjects, {listProjects} from "./ListProjects"
import CreateProject, {createProject} from "./CreateProject"
import DisplayProject, {loadProject} from "./DisplayProject"
import Listing2 from './Listing';
// Using the createBrowserRouter method to create the router provider
// It takes a list of objects representing the routes in the application
// Nesting routes via the `children` property embeds the rendered `element`s. So, for example
// `<App />` will render as a wrapper around the `<CreateForm />` or `<Listing />` components for
// those matching routes.
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/projects",
				element: <ListProjects/>,
				loader: listProjects,
			},
			{
				path: "/project/new",
				element: <CreateProject/>
			},
			{
				path: "/project/:projectID/",
				element: <Listing/>,
				children: [
					{
						path: "Todo/new",
						element: <CreateTodo />,
					},
					{
						path: "Todo/:todoId",
						element: <LoadTodo />,
					},
				]
			},
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	  <header className="navbar"> {/* Apply the 'navbar' class */}
		<div className="navbar-items">
		  <img src={require("./minesLogo.jpg")} alt="logo" className="navbar-logo" />
		  <a href="/" className="navbar-button">Sign Up</a>
		  <a href="/project/new" className="navbar-button">Login</a>
		  <a href="/projects" className="navbar-button">My Items</a>
		  <a href="/projects" className="navbar-button">Create Item</a>
		  <a href="/projects" className="navbar-button">All Items</a>
		  <div className="cart-wrapper">
			<a href="/projects" className="navbar-button">My Cart</a>
		  </div>
		  {/* Add more buttons as needed */}
		</div>
	  </header>
	  <RouterProvider router={router} />
	  <footer className="footer"> {/* Apply the 'footer' class */}
		<p>Created By: <br></br> Patrick Maes, Bumsoo Kim, Camryn Elliott</p>
	  </footer>
	</React.StrictMode>
  );
  
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
