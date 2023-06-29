import React, { useState, useEffect, useRef } from "react";

function DrawingCanvas() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  function startDrawing(e) {
    setIsDrawing(true);
    setPrevX(e.clientX - canvasRef.current.offsetLeft);
    setPrevY(e.clientY - canvasRef.current.offsetTop);
  }

  function draw(e) {
    if (!isDrawing) return;

    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (tool === "pen") {
      ctx.strokeStyle = "black"; // Set the pen color (change as desired)
      ctx.lineWidth = 2; // Set the pen width (change as desired)
      ctx.lineCap = "round"; // Set the pen line cap style (change as desired)

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.clearRect(x - 5, y - 5, 10, 10);
    }

    setPrevX(x);
    setPrevY(y);
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function changeTool(selectedTool) {
    setTool(selectedTool);
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ textAlign: "right", padding: "10px" }}>
        <button
          onClick={() => changeTool("pen")}
          style={{
            marginRight: "10px",
            backgroundColor: tool === "pen" ? "lightgray" : "transparent",
          }}
        >
          Pen
        </button>
        <button
          onClick={() => changeTool("eraser")}
          style={{
            marginRight: "10px",
            backgroundColor: tool === "eraser" ? "lightgray" : "transparent",
          }}
        >
          Eraser
        </button>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
}

export default DrawingCanvas;
