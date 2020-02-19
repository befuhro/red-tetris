import io from "socket.io-client";
import cloneDeep from 'lodash/cloneDeep';

import { getPiece } from '../../../../src/client/reducers/room/getPiece';

const socket = io('');

const board = Array(200).fill({color: 'white'}).map((square, index) => (
    {...square, ...{row: Math.floor(index / 10), column: index % 10}}));

const addFullLines = (board, lines) =>
    board.map(bloc => lines.includes(bloc.row) ? {...bloc, color: 'red'} : bloc);

describe('getPiece reducer', () => {
    it('should return same state, expect indexPieces is + 1', () => {
        const state = {
            board: cloneDeep(board),
            current: undefined,
            pieces: [],
            indexPieces: 0,
            socket: socket
        };
        expect(getPiece(state)).toMatchObject({
            ...state,
            ...{indexPieces: state.indexPieces + 1}
        });
    });

    it('should return same board with empty lines', () => {
        const state = {
            board: addFullLines(board, [1, 5, 9, 12]),
            current: undefined,
            pieces: ['piece'],
            indexPieces: 0,
            socket: socket
        };
        expect(getPiece(state)).toMatchObject({
            ...state,
            board: cloneDeep(board),
            current: 'piece',
            indexPieces: state.indexPieces + 1
        });
    });
});
