import { Client } from "@stomp/stompjs";

export const clientStomp = new Client({
    brokerURL: "ws://localhost:8080/spring-stomp",
    onStompError: (err) => {
        console.log(err);
    },
    onWebSocketError: (err) => {
        console.log(err);
    },
})

