import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Cart from "./Cart"; // Import the Cart component
import Listing from "./Listing";
<<<<<<< Updated upstream
import ListProducts, { listProducts } from "./ListProducts";
import CreateProduct, { createProduct } from "./CreateProduct";
import CreateUser from "./CreateUser";
import VerifyUser from "./VerifyUser";

const App = () => {
  // Check if the user is logged in from local storage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Update local storage when the login state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
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
          {isLoggedIn && <a href="/products" className="navbar-button">My Items</a>}
          {isLoggedIn && <a href="/product/new" className="navbar-button">Create Item</a>}
          {isLoggedIn && <a href="/products" className="navbar-button">All Items</a>}
          <div className="cart-wrapper">
            <a href="/products" className="navbar-button">My Cart</a>
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
=======
import ListProducts, {listProducts} from "./ListProducts"
import CreateProduct, {createProduct} from "./CreateProduct"
import CreateUser from "./CreateUser"
import VerifyUser from "./VerifyUser"

// Using the createBrowserRouter method to create the router provider
// It takes a list of objects representing the routes in the application
// Nesting routes via the `children` property embeds the rendered `element`s. So, for example
// `<App />` will render as a wrapper around the `<CreateForm />` or `<Listing />` components for
// those matching routes.
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
    {
        path: "/users/signup",
        element: <CreateUser/>
    },
    {
        path: "/login",
        element: <VerifyUser/>
    },
    {
        path: "/products",
        element: <ListProducts/>,
        loader: listProducts,
    },
    {
        path: "/product/new",
        element: <CreateProduct/>
    },
    {
        path: "/products/:productID",
        element: <Listing/>
    },
    {
        path: "/cart",
        element: <Cart/> // Adding the Cart route
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <header className="navbar"> {/* Apply the 'navbar' class */}
        <div className="navbar-items">
            <a href="/">
                <img src={require("./minesLogo.jpg")} alt="logo" className="navbar-logo" />    
            </a>
            <a href="/users/signup" className="navbar-button">Sign Up</a>
            <a href="/login" className="navbar-button">Login</a>
            <a href="/products" className="navbar-button">My Items</a>
            <a href="/product/new" className="navbar-button">Create Item</a>
            <a href="/products" className="navbar-button">All Items</a>
            <a href="/cart" className="navbar-button">My Cart</a> {/* Correct the link to the Cart */}
        </div>
      </header>
      <RouterProvider router={router} />
      <footer className="footer"> {/* Apply the 'footer' class */}
        <p>Created By: <br></br> Patrick Maes, Bumsoo Kim, Camryn Elliott</p>
      </footer>
    </React.StrictMode>
);
>>>>>>> Stashed changes

reportWebVitals();
