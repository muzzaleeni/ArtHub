import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [drawingId, setDrawingId] = useState(null);

  const handleStartDrawing = () => {
    const token = localStorage.getItem("authToken");

    const requestData = {
      drawing_name: "Your drawing name",
      about: "Information about your drawing",
    };

    fetch("http://localhost:8000/drawings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        const { drawing_id } = data;
        setDrawingId(drawing_id);
        navigate(`/dashboard/canvas/${drawing_id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={handleStartDrawing}>
            Start Drawing
          </button>
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
  );
};

export default Navbar;
