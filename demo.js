// See https://github.com/unitn-ASA/Deliveroo.js/tree/master/packages
import { DjsConnect, DjsClientSocket } from "@unitn-asa/deliveroo-js-sdk/client";

const socket = DjsConnect('localhost:8080');

let myPosition = { x: 0, y: 0 };

socket.on('you', (id, name, x, y,) => {
    myPosition = { x, y };
})

