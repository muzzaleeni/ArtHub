import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    fetchUserDrawings()
      .then((data) => setDrawings(data))
      .catch((error) => console.log(error));
  }, []);

  const fetchUserDrawings = () => {
    return fetch("/drawings/personal") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="thumbnails-container">
        {drawings.map((drawing) => (
          <div key={drawing.id} className="thumbnail">
            <img src={drawing.thumbnailUrl} alt={drawing.title} />
            <p>{drawing.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
