import { useState } from "react";
import { clientStomp } from "./websocket";

export default function WebSocketComponent() {
  let [input, setInput] = useState("");

  const turnOnConnect = () => {
    clientStomp.activate();
  };

  const turnOffConnect = () => {
    clientStomp.deactivate();
  };

  const sendName = () => {
    if (clientStomp && clientStomp.connected) {
      clientStomp.publish({
        destination: "/app/hello",
        body: JSON.stringify({ name: input }),
      });
    }
  };

  return (
    <>
      <h1>This is websocket</h1>
      <button onClick={turnOnConnect}>Connect</button>
      <button onClick={turnOffConnect}>Disconnect</button>
      <form style={{ marginTop: "20px" }}>
        <label htmlFor="name"> Name </label>
        <input type="text" onInput={(e) => setInput(e.target.value)} />
        <button type="button" onClick={sendName}>
          Send Name
        </button>
      </form>
    </>
  );
}
