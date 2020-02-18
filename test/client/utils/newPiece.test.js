import cloneDeep from "lodash/cloneDeep";

import * as fn from '../../../src/client/utils/newPiece';

test('putCurrentToBoard', () => {
    const board = Array(200).fill({color: "white"}).map((square, index) => (
        {...square, ...{row: Math.floor(index / 10), column: index % 10}}));
    expect(fn.putCurrentToBoard(board, null)).toBe(board);
    const current = {
        color: 'red',
        position: [
            {row: 19, column: 6},
            {row: 19, column: 7},
            {row: 19, column: 8},
            {row: 19, column: 9},
        ]
    };
    let newBoard = cloneDeep(board);
    newBoard[196] = {color: 'red', row: 19, column: 6};
    newBoard[197] = {color: 'red', row: 19, column: 7};
    newBoard[198] = {color: 'red', row: 19, column: 8};
    newBoard[199] = {color: 'red', row: 19, column: 9};
    expect(fn.putCurrentToBoard(board, current)).toMatchObject(newBoard);
});
