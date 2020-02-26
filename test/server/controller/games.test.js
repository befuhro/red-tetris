import {handleRoomConnection, connectPlayer} from "../../../src/server/controller/games";
import SocketMock from 'socket.io-mock';

describe('games', () => {
    it('join', () => {
        let socket = new SocketMock();
        handleRoomConnection(socket);
        socket.socketClient.emit("join room", {room: 'myroom', username: 'johndoe'}, (authData) => {console.log(authData)});
        socket.socketClient.emit("join room", {room: 'myroom', username: 'jackwhite'}, (authData) => {console.log(authData)});
        socket.socketClient.emit("join room", {room: 'myroom', username: 'jackwhite'}, (authData) => {console.log(authData)});
        socket.socketClient.emit("check availability", {room: 'myroom', username: 'jackwhite'}, (authData) => {console.log(authData)});
        socket.socketClient.emit("disconnect", "he got bored");
    });

    it('Build', () => {

    });
});
