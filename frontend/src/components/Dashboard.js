import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DrawingForm from "./DrawingForm";

const Dashboard = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    fetchUserDrawings()
      .then((data) => {
        console.log("Fetched drawings:", data);
        setDrawings(data.drawings);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchUserDrawings = () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from local storage

    return fetch("http://localhost:8000/drawings/personal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user drawings");
        }
      })
      .catch((error) => {
        console.log(error);
        return { drawings: [] };
      });
  };

  console.log("Drawings state:", drawings);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="thumbnails-container">
        {drawings.map((drawing) => (
          <div key={drawing._id} className="thumbnail">
            <img src={drawing.thumbnailUrl} alt={drawing.drawing_name} />
            <div className="drawing-info">
              <h3>{drawing.drawing_name}</h3>
              <p>{drawing.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
