import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log("yeah it run");
  console.log("yeah it run again");

  return (
    <>
      <h1>Vite + React + Docker</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p>
        {`Hello, ${import.meta.env.VITE_APP_NAME}`} and{" "}
        {`${import.meta.env.VITE_APP_SAMPLE}`}
      </p>
    </>
  );
}
export default App;
