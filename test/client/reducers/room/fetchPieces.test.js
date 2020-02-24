import {movePiece as movePieceAction} from "../../../../src/client/actions/room";
import {movePiece as movePieceReducer} from "../../../../src/client/reducers/room/movePiece";
import {initialState} from "../../../../src/client/reducers/room";
import {BOTTOM} from "../../../../src/client/utils/direction";

describe('movePiece reducer', () => {
    it('should return same state', () => {
        expect(movePieceReducer(initialState(), movePieceAction(BOTTOM))).toMatchObject(initialState());
    });
});
