import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Listing from "./Listing";
import ListProducts, { listProducts } from "./ListProducts";
import CreateProduct, { createProduct } from "./CreateProduct";
import CreateUser from "./CreateUser";
import VerifyUser from "./VerifyUser";
import Cart from "./Cart"; 
import MyOrders from "./MyOrders"; 

const App = () => {
	// Check if the user is logged in from local storage
	const [isLoggedIn, setIsLoggedIn] = useState(
	  localStorage.getItem('isLoggedIn') === 'true'
	);
	const [username, setUsername] = useState(localStorage.getItem('username'));
  
	// Update local storage when the login state changes
	useEffect(() => {
	  localStorage.setItem('isLoggedIn', isLoggedIn);
	  localStorage.setItem('username', username);
	}, [isLoggedIn, username]);
  
	const handleLoginSuccess = (username) => {
	  setIsLoggedIn(true);
	  setUsername(username); // Update username state
	};
  
	const handleLogout = () => {
	  setIsLoggedIn(false);
	  setUsername(''); // Clear username state
	  localStorage.removeItem('isLoggedIn');
	  localStorage.removeItem('username');
	};

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
    {
      path: "/users/signup",
      element: <CreateUser />
    },
    {
      path: "/login",
      element: <VerifyUser handleLoginSuccess={handleLoginSuccess}/>
    },
    {
      path: "/products",
      element: <ListProducts />,
      loader: listProducts,
    },
    {
      path: "/product/new",
      element: <CreateProduct />
    },
    {
      path: "/products/:productID/",
      element: <Listing />
    },
	{
		path: "/cart",
		element: isLoggedIn ? <Cart /> : <VerifyUser handleLoginSuccess={handleLoginSuccess}/>
	},
	{
		path: "/my-orders",
		element: <MyOrders />
	}
  ]);

  return (
    <React.StrictMode>
      <header className="navbar">
      <div className="navbar-items">
          <a href="/">
            <img src={require("./minesLogo.jpg")} alt="logo" className="navbar-logo" />
          </a>
          {!isLoggedIn && <a href="/users/signup" className="navbar-button">Sign Up</a>}
          {!isLoggedIn && <a href="/login" className="navbar-button">Login</a>}
          {isLoggedIn && <a href="/my-orders" className="navbar-button">My Orders</a>}
          {isLoggedIn && <a href="/product/new" className="navbar-button">Create Item</a>}
          {isLoggedIn && <a href="/products" className="navbar-button">All Items</a>}
		  {isLoggedIn && <span className="navbar-username">Welcome, {username}</span>}
          <div className="cart-wrapper">
            <a href="/cart" className="navbar-button">My Cart</a>
          </div>
        </div>
      </header>
      <RouterProvider router={router} isLoggedIn={isLoggedIn} handleLoginSuccess={handleLoginSuccess} />
      <footer className="footer">
        <p>Created By: <br></br> Patrick Maes, Bumsoo Kim, Camryn Elliott</p>
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </footer>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
