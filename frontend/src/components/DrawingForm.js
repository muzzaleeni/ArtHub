import React, { useState } from "react";

const DrawingForm = ({ handleStartDrawing }) => {
  const [drawingName, setDrawingName] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStartDrawing(drawingName, about);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Drawing Name:
        <input
          type="text"
          value={drawingName}
          onChange={(e) => setDrawingName(e.target.value)}
        />
      </label>
      <br />
      <label>
        About:
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
      </label>
      <br />
      <button type="submit">Start Drawing</button>
    </form>
  );
};

export default DrawingForm;
