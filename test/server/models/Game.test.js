import ioClient from 'socket.io-client';
const server = require('http').createServer();
const io = require('socket.io')(server);
const room = io.of("/room");
const socket = ioClient('localhost:8080/room');

import Game from "../../../src/server/models/Game";

beforeAll(done => {
    server.listen(8080);
    done();
});

afterAll(done => {
    server.close();
    socket.close();
    done();
});

describe('game', () => {
    it('construct', () => {
        let game = new Game("1", "johndoe");
        expect(game != null);
    });

    it('pieces', () => {
        let game = new Game("1", "johndoe");
        game.addPieces(2);
        game.fetchPieces(0);
        expect(game.fetchPieces(15) == null);
    });


    it('players', () => {
        let game = new Game("2", "johndoe");
        game.addPlayer("test", socket);
        expect(game.getPlayerList().length == 2);
        // game.deletePlayer("johndoe");
        // expect(game.getPlayerList().length == 1);
        game.getPlayersInfo();

        socket.on('opponent disconnection', (data) => {
            expect(true);
        });
    });

    it('infos', () => {
        let game = new Game("3", "johndoe");
        game.setInterval(1);
        game.setInterval(0);
    });
});
