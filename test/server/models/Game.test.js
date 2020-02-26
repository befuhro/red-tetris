import SocketMock from 'socket.io-mock';

import Game from "../../../src/server/models/Game";

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
        let socket = new SocketMock();
        socket.join("myroom");
        let game = new Game("myroom", "johndoe");
        game.addPlayer("johndoe", socket);
        let player_socket = new SocketMock();
        player_socket.join("myroom");
        game.addPlayer("johnfrancis", player_socket);
        expect(game.getPlayerList().length == 2);
        game.deletePlayer("johnfrancis");
        game.deletePlayer("johndoe");
    });

    it('infos', () => {
        let game = new Game("3", "johndoe");
        game.setInterval(1);
        game.setInterval(0);
    });
});
