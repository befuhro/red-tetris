const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { pingTimeout: 30000 });

const gameController = require("./controller/games");

server.listen(8080);

app.use('/', express.static('./dist'));

const room = io.of("/room");

room.on("connection", (socket) => { gameController.handleRoomConnection(socket)});
