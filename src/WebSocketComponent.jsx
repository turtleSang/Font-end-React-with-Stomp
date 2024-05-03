import { useCallback, useEffect, useState } from "react";
import { clientStomp } from "./websocket";
// import { Client } from "@stomp/stompjs";

export default function WebSocketComponent() {
  let [input, setInput] = useState("");
  let [connect, setConnect] = useState(false);
  let [chats, setChats] = useState([{}]);

  clientStomp.onWebSocketClose = () => {
    console.log("disconnect");
    setConnect(false);
  };

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

  const checkConnected = () => {
    console.log(
      "Connected " + clientStomp.connected ? "establish" : "was destroy"
    );
  };

  clientStomp.onConnect = (frame) => {
    console.log("Connect");
    setConnect(true);
    clientStomp.subscribe("/topic/greetings", (mess) => {
      let txt = JSON.parse(mess.body);
      setChats((chats) => {
        return [...chats, txt];
      });
      console.log(chats);
    });
  };
  return (
    <>
      <h1>This is websocket</h1>
      <button disabled={connect} onClick={turnOnConnect}>
        Connect
      </button>
      <button disabled={!connect} onClick={turnOffConnect}>
        Disconnect
      </button>
      <button onClick={checkConnected}>Check Connected</button>
      <form style={{ marginTop: "20px" }}>
        <label htmlFor="name"> Name </label>
        <input type="text" onInput={(e) => setInput(e.target.value)} />
        <button disabled={!connect} type="button" onClick={sendName}>
          Send Name
        </button>
      </form>
      <div className="">
        {chats.map((value) => (
          <p> {value.content}</p>
        ))}
      </div>
    </>
  );
}
