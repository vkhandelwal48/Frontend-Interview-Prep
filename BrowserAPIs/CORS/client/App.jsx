import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((result) => setData(result.message))
      .catch((err) => console.error(err));
  }, []);

  const sendPostRequest = async () => {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Vidit" }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React + Express CORS Demo</h1>
      <p>{data}</p>
      <button onClick={sendPostRequest}>Send POST Request</button>
    </div>
  );
}

export default App;
