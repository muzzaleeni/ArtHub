import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="main-page">
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/canvas" className="nav-link">
              Start Drawing
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                My Dashboard
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="content">
        <h1>Welcome to the Drawers Web App</h1>
        <p>Express your creativity and collaborate with others!</p>

        {/* Rest of the content */}
      </div>
    </div>
  );
};

export default MainPage;
