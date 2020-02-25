import Piece from "../../../src/server/models/Piece";

describe('piece', () => {
    it('construct', () => {
        let piece = new Piece(0);
        expect(piece.color == 'yellow');
    })
});
