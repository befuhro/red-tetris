import {initialState} from "../../../../src/client/reducers/room";

import {rotatePiece} from "../../../../src/client/reducers/room/rotatePiece";

describe('movePiece reducer', () => {
    it('should return same state', () => {
        expect(rotatePiece(initialState())).toMatchObject(initialState());
    });

    it('should return new board', () => {
        const initState = initialState();
        const current = {
            position: [ {column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}],
            indexRotation: 1,
            rotation: [
                [ {column: 2, row: 0}, {column: 1, row: -1}, {column: 0, row: 0}, {column: -1, row: 1}],
                [ {column: 0, row: 2}, {column: 1, row: 1}, {column: 0, row: 0}, {column: -1, row: -1}],
                [ {column: -2, row: 0}, {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}],
                [ {column: 0, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1}],
            ]
        };
        const originalState = {
            ...initState,
            current: {
                ...initState.current,
                ...current
            }
        };
        const rotation = originalState.current.rotation[originalState.current.indexRotation - 1];
        expect(rotatePiece(originalState)).toMatchObject({
            ...originalState,
            current: {
                ...originalState.current,
                indexRotation: originalState.current.indexRotation < 4 ? originalState.current.indexRotation + 1 : 1,
                position: originalState.current.position.map((position, index) => ({
                    column: position.column + rotation[index].column,
                    row: position.row + rotation[index].row
                }))
            }
        });
    });
});
