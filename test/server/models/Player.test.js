import ioClient from 'socket.io-client';
const server = require('http').createServer();
const io = require('socket.io')(server);
const room = io.of("/room");
const socket = ioClient('localhost:8080/room');

import Player from "../../../src/server/models/Player";

beforeAll(done => {
    server.listen(8080);
    done();
});

afterAll(done => {
    server.close();
    socket.close();
    done();
});

describe('player', () => {
    it('construct', () => {
        let player = new Player('dédé', null, null);
        expect(player.username === 'dédé');
        expect(player.score === 0);
    });

    it('spectrum', () => {
        let player = new Player('dédé', socket, "myroom");
        let spectrum = [];
        for (let i = 0; i < 20; i++) {
            spectrum[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        }

        player.updateSpectrum(spectrum);
        socket.on('new_spectrum', (data) => {
            console.log("new spectrum");
            expect(data.spectrum[1] == [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        });
    });
});
