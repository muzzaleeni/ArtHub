import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // Handle login submission
  const handleLogin = () => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post("http://localhost:8000/auth/users/tokens", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        // Perform login success operations
        setLoginStatus("success");
        const token = res.data.access_token;
        localStorage.setItem("authToken", token); // Store the token in local storage
        setIsAuthenticated(true); // Set isAuthenticated to true
        navigate("/dashboard");
        console.log(res);
      })
      .catch((error) => {
        // Perform login failure operations
        setLoginStatus("failure");
        console.error(error);
      });
  };

  return (
    <div className="login-page">
      <h1 className="card text-white bg-primary mb-1">ArtHub</h1>
      <h6 className="card text-white bg-primary mb-3">
        Platform for art enthusiasts to share and contribute to art society
      </h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">
          Sign in to access your account
        </h5>
        <span className="card-text">
          <input
            className="mb-2 form-control"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
          <input
            className="mb-2 form-control"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <button
            className="btn btn-outline-primary mx-2 mb-3"
            onClick={handleLogin}
          >
            Sign In
          </button>
          {loginStatus === "success" && <p>Login Successful!</p>}
          {loginStatus === "failure" && <p>Login Failed. Please try again.</p>}
        </span>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        ArtHub 2023, All rights reserved &copy;
      </h6>
    </div>
  );
};

export default LoginPage;
