import {movePiece as movePieceAction} from "../../../../src/client/actions/room";
import {movePiece as movePieceReducer} from "../../../../src/client/reducers/room/movePiece";
import {initialState} from "../../../../src/client/reducers/room";
import {BOTTOM} from "../../../../src/client/utils/direction";

describe('movePiece reducer', () => {

    it('should return same state', () => {
        expect(movePieceReducer(initialState(), movePieceAction(BOTTOM))).toMatchObject(initialState());
    });

    it('should return new board and new position', () => {
        const formerState = {
            ...initialState(),
            current: {
                position: [
                    {column: 4, row: 0},
                    {column: 4, row: 1},
                    {column: 4, row: 2},
                    {column: 4, row: 3},
                ],
                color: 'lightblue'
            }
        };
        const newState = {
            ...initialState(),
            current: {
                position: [
                    {column: 4, row: 1},
                    {column: 4, row: 2},
                    {column: 4, row: 3},
                    {column: 4, row: 4},
                ],
                color: 'lightblue'
            }
        };
        expect(movePieceReducer(formerState, movePieceAction(BOTTOM))).toMatchObject(newState);
    });
});
