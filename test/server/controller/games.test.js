import {handleRoomConnection, connectPlayer} from "../../../src/server/controller/games";
import SocketMock from 'socket.io-mock';

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

        socket.socketClient.emit("disconnect", "he got bored");

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
        done();
    });
});
