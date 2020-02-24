import {initialState} from "../../../../src/client/reducers/room";

import {rotatePiece} from "../../../../src/client/reducers/room/rotatePiece";

describe('movePiece reducer', () => {
    it('should return same state', () => {
        expect(rotatePiece(initialState())).toMatchObject(initialState());
    });
});
