const cloneDeep = require("lodash/cloneDeep");
const Piece = require("../models/Piece");
const Player = require("../models/Player");

class Game {
    constructor(name, leaderName) {
        this.name = name;
        this.players = {};
        this.leaderName = leaderName;
        this.Pieces = [];
        this.gameIsStarted = false;
        this.interval = 250;
		this.addPieces(10);
    }

    addPiece() {
        const index =  Math.floor(Math.random() * Math.floor(7));
        this.Pieces.push(new Piece(index));
    }

    addPieces(number) {
        for (let i = 0; i < number; i++) {
            this.addPiece();
        }
    }

    fetchPieces(from) {
        if (from + 10 >= this.Pieces.length) {
            this.addPieces(5);
        }
        return (this.Pieces.slice(from, from + 5));
    }

    addPlayer(playerName, socket) {
        this.players[playerName] = new Player(playerName, socket, this.name);
    }

    getPlayerList() {
        let list = [];
        const copyPlayers = cloneDeep(this.players);
        Object.entries(copyPlayers).forEach(([key]) => list.push(key));
        return (list);
    }
	
	setInterval(value) {
		if (value > 0 && value <= 1000) {
			this.interval = value;
		}
	}

    getPlayersInfo() {
        let infos = cloneDeep(this.players);
        Object.entries(infos).forEach((info) => { delete info[1].socket});
        return (infos);
    }

    // Delete player from player list, broadcast the new list, disconnect his socket and delete him from players object.
    deletePlayer(playerName) {
        let playersList = this.getPlayerList();
        let players = this.getPlayersInfo();
        delete playersList[playerName];
        delete players[playerName];
        if (playerName === this.leaderName) {
            this.leaderName = playersList[1];
        }
        this.players[playerName].socket.to(this.name).emit("opponent disconnection", {
            players: players, leaderName: this.leaderName });
        this.players[playerName].socket.disconnect();
        delete this.players[playerName];
    }
}

module.exports = Game;
