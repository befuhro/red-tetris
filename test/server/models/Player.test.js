import SocketMock from 'socket.io-mock';

import Player from "../../../src/server/models/Player";

describe('player', () => {

    it('construct', () => {
        let player = new Player('dédé', null, null);
        expect(player.username === 'dédé');
        expect(player.score === 0);
    });

    it('spectrum', () => {
        let socket = new SocketMock();
        socket.join("myroom");
        socket.on('new_spectrum', (data) => {
            expect(data.spectrum[1] == [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        });
        let player = new Player('dédé', socket, "myroom");
        let spectrum = [];
        for (let i = 0; i < 20; i++) {
            spectrum[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        }
        player.updateSpectrum(spectrum);
    });
});
