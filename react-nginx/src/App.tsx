import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  console.log("yeah it run");
  console.log("yeah it run again");

  return (
    <>
      <h2>Vite + React + Typescript + Docker + Nginx</h2>
      <div className="card">
        <p>Current time: </p>
        <h1>{time.toLocaleTimeString()}</h1>
      </div>
      <strong>
        {`  ${import.meta.env.VITE_APP_NAME}`}
        {"\n"}
        <br />
        and
        <br />
        {"\n"}
        {`${import.meta.env.VITE_APP_SAMPLE}`}
      </strong>
    </>
  );
}
export default App;
