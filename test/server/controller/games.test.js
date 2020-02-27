import {handleRoomConnection} from "../../../src/server/controller/games";
import SocketMock from 'socket.io-mock';
import SocketClient from 'socket.io-mock';

describe('games', () => {

    it('join', (done) => {
        let socket = new SocketMock();
        handleRoomConnection(socket);

        socket.socketClient.emit("join room", {room: 'myroom', username: 'johndoe'});
        socket.socketClient.emit("join room", {room: 'myroom', username: 'jackwhite'});
        // Already there
        socket.socketClient.emit("join room", {room: 'myroom', username: 'jackwhite'});

        socket.socketClient.emit("check availability", {room: 'myroom', username: 'jackwhite'});

        socket.socketClient.emit("join room", {room: 'myroom', username: '3'});
        socket.socketClient.emit("join room", {room: 'myroom', username: '4'});

        socket.socketClient.emit("check availability", {room: 'myroom', username: 'jackwhite'});

        socket.socketClient.emit("join room", {room: 'myroom', username: 'player 1'});
        socket.socketClient.emit("check availability", {room: 'myroom', username: 'undefined'});

        socket.socketClient.emit("start party");

        socket.socketClient.emit("check availability", {room: 'myroom', username: 'jackwhite'});

        socket.socketClient.emit("disconnect", "he got bored");
        done();
    });

    it('fetch piece', (done) => {
        let socket = new SocketMock();
        handleRoomConnection(socket);
        socket.socketClient.emit("join room", {room: 'fetchroom', username: 'player 1'});
        socket.socketClient.emit("fetch pieces", 5);
        socket.socketClient.emit("player ended");
        socket.socketClient.emit("fetch pieces", 5);
        done();
    });

    it('player ended', (done) => {
        let socket = new SocketMock();
        handleRoomConnection(socket);
        socket.socketClient.emit("join room", {room: 'fetchroom', username: 'player 1'});
        socket.socketClient.emit("player ended");
        done();
    });

    it('configure', (done) => {
        let socket = new SocketMock();
        handleRoomConnection(socket);
        socket.socketClient.emit("join room", {room: 'moderoom', username: 'player 1'});
        socket.socketClient.emit("mode set", 'normal');
        socket.socketClient.emit("set interval", 0.1);
        done();
    });

    it('piece placed', (done) => {
        let socket = new SocketMock();
        let client2 = new SocketClient();
        handleRoomConnection(socket);
        socket.socketClient.emit("join room", {room: 'pieceroom', username: 'player 1'});
        client2.emit("join room", {room: 'pieceroom', username: 'player 2'});
        socket.socketClient.emit("join room", {room: 'pieceroom', username: 'player 3'});
        socket.socketClient.emit("mode set", 'sudden death');
        socket.socketClient.emit("start party");
        let spectrum = [];
        for (let i = 0; i < 20; i++) {
            spectrum[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        }
        for (let i = 0; i < 31; ++i) {
            socket.socketClient.emit("piece placed", spectrum);
        }
        for (let i = 0; i < 31; ++i) {
            client2.emit("piece placed", spectrum);
        }
        done();
    });
});
