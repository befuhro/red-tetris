import ioClient from 'socket.io-client';

import {roomConnection} from "../../../src/client/utils/socketConnection";

const server = require('http').createServer();
const io = require('socket.io')(server);
const room = io.of("/room");
const socketClient = ioClient('localhost:8080/room');

describe('socket', () => {

    beforeAll(done => {
        server.listen(8080);
        done();
    });

    it('opponent connection', done => {
        roomConnection(socketClient, data => {
            if (data.type === 'CHANGE_INTERVAL') {
                socketClient.disconnect();
                server.close();
                done();
            }
        });

        room.on('connect', socketServer => {
            socketServer.emit('opponent connection', {players: ['test'], leaderName: 'hada'});
            socketServer.emit('opponent disconnection', {players: ['test'], leaderName: 'hada'});
            socketServer.emit('new spectrum', {});
            socketServer.emit('launch party');
            socketServer.emit('update interval', 150);
        });
    });
});
