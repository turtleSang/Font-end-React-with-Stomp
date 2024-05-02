import { useState } from "react";
import WebSocketComponent from "./WebSocketComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Web-socket demo</h1>
      <WebSocketComponent />
    </>
  );
}

export default App;
