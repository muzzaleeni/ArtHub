import React, { useState } from "react";
import "./RegistrationPage.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  // Register a user
  const addUserHandler = () => {
    axios
      .post("http://localhost:8000/auth/users", {
        email: username,
        password: password,
      })
      .then((res) => {
        setRegistrationStatus("success");
        console.log(res);
      })
      .catch((error) => {
        setRegistrationStatus("failure");
        console.error(error);
      });
  };

  return (
    <div
      className="App list-group-item  justify-content-center align-items-center mx-auto"
      style={{ width: "400px", backgroundColor: "white", marginTop: "15px" }}
    >
      <h1
        className="card text-white bg-primary mb-1"
        style={{ maxWidth: "20rem" }}
      >
        ArtHub
      </h1>
      <h6 className="card text-white bg-primary mb-3">
        Platform for art enthusiasts to share and contribute to art society
      </h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">
          Sign up to create and contribute to art society
        </h5>
        <span className="card-text">
          <input
            className="mb-2 form-control titleIn"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
          <input
            className="mb-2 form-control desIn"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <button
            className="btn btn-outline-primary mx-2 mb-3"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            }}
            onClick={addUserHandler}
          >
            Sign Up
          </button>
          {registrationStatus === "success" && <p>Registration Successful!</p>}
          {registrationStatus === "failure" && (
            <p>Registration Unsuccessful. Please try again.</p>
          )}
        </span>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        ArtHub 2023, All rights reserved &copy;
      </h6>
    </div>
  );
}

export default RegistrationPage;
