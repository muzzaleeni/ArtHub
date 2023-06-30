import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import Navbar from "./Navbar";

const MainPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="main-page">
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="content">
        <h1>Welcome to the ArtHub community</h1>
        <p>Express your creativity and collaborate with others!</p>

        {/* Rest of the content */}
      </div>
    </div>
  );
};

export default MainPage;
