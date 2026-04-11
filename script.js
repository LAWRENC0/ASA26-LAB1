import { DjsConnect } from "@unitn-asa/deliveroo-js-sdk";
import 'dotenv/config'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const dirs = ["up", "down", "left", "right"];

let game_map;

const djsConnect = DjsConnect(
    process.env.HOST,
    process.env.TOKEN,
    process.env.USER_NAME
);

djsConnect.onMap(async (width, height, tiles) => {
    game_map = { width, height, tiles };
    console.log(`Received Map: w=${game_map.width} h=${game_map.height}`);
    // console.log(`tiles = ${game_map.tiles}`);
    for (let i = 0; i < game_map.tiles.length; i++) {
        const tile = game_map.tiles[i];
        console.log(`tile${i}: x = ${tile.x} y = ${tile.y} type = ${tile.type}`)
    }
});

djsConnect.onYou(me => console.log("Received update for me: " + me.x + ", " + me.y));

async function move() {
    while (true) {
        if (!game_map) {
            await delay(500);
            continue;
        }
        let r = getRndInteger(0, 3);
        console.log("Trying a move to " + dirs[r]);

        const map = await djsConnect.map();
        const move = await djsConnect.emitMove(dirs[r]);
        if (move.hasOwnProperty('x') && move.hasOwnProperty('y')) {
            console.log("moved to " + move.x + ", " + move.y);
        } else {
            console.log("move failed");
        }

        await delay(500);
    }
}

move();