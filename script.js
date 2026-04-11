import { DjsConnect } from "@unitn-asa/deliveroo-js-sdk";
import 'dotenv/config'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const djsConnect = DjsConnect(
    process.env.HOST,
    process.env.TOKEN,
    process.env.USER_NAME
);

const dirs = ["up", "down", "left", "right"];

djsConnect.onYou(me => console.log("Received update for me: " + me.x + ", " + me.y));

async function move() {
    while (true) {
        let r = getRndInteger(0, 3);
        console.log("Trying a move to " + dirs[r]);

        const res = await djsConnect.emitMove(dirs[r]);
        if (res.hasOwnProperty('x') && res.hasOwnProperty('y')) {
            console.log("moved to " + res.x + ", " + res.y);
        } else {
            console.log("move failed");
        }

        await delay(500);
    }

}

move();