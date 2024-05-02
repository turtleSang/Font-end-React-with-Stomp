import { Client } from "@stomp/stompjs";

export const clientStomp = new Client({
    brokerURL: "ws://localhost:8080/spring-stomp",
    onConnect: (frame) => {
        console.log(frame);
        clientStomp.subscribe("/topic/greetings", (messenger) => {
            console.log(messenger.body);
        })
    },
    onStompError: (err) => {
        console.log(err);
    },
    onWebSocketError: (err) => {
        console.log(err);
    },
    onWebSocketClose: (evt) => {
        console.log(evt);
    }
})