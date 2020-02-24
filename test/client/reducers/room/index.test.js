import reducer, {initialState} from "../../../../src/client/reducers/room";

import {
    joinRoomSuccess,
    joinRoomFailure,
    updateRoom,
    updateSpectrum,
    getPiece,
    movePiece,
    rotatePiece,
    changeInterval,
    startPartySuccess
} from "../../../../src/client/actions/room";
import cloneDeep from "lodash/cloneDeep";
import io from "socket.io-client";
import {BOTTOM} from "../../../../src/client/utils/direction";


const socket = io('');

const board = Array(200).fill({color: 'white'}).map((square, index) => (
    {...square, ...{row: Math.floor(index / 10), column: index % 10}}));

const addFullLines = (board, lines) =>
    board.map(bloc => lines.includes(bloc.row) ? {...bloc, color: 'red'} : bloc);



describe('change interval action', () => {
    it('should return return same state with different interval', () => {
        expect(reducer(initialState(), changeInterval(500)))
            .toMatchObject({...initialState(), intervalMove: 500})
    });
});

describe('rotate piece action', () => {
    it('should return rotated piece', () => {
        const initState = initialState();
        const current = {
            position: [{column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}],
            indexRotation: 1,
            rotation: [
                [{column: 2, row: 0}, {column: 1, row: -1}, {column: 0, row: 0}, {column: -1, row: 1}],
                [{column: 0, row: 2}, {column: 1, row: 1}, {column: 0, row: 0}, {column: -1, row: -1}],
                [{column: -2, row: 0}, {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}],
                [{column: 0, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1}],
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
        expect(reducer(originalState, rotatePiece())).toMatchObject({
            ...originalState,
            current: {
                ...originalState.current,
                indexRotation: originalState.current.indexRotation < 4 ? originalState.current.indexRotation + 1 : 1,
                position: originalState.current.position.map((position, index) => ({
                    column: position.column + rotation[index].column,
                    row: position.row + rotation[index].row
                }))
            }
        })
    });
});

describe('new spectrum action', () => {
    it('should return new spectrum', () => {
        const playerName = 'befuhro';
        const spectrum = [0, 0];
        const originalState = initialState();
        const newState = {
            ...originalState,
            players: {
                [playerName]: {
                    spectrum: spectrum
                }
            }
        };
        expect(reducer(initialState(), updateSpectrum(playerName, spectrum))).toMatchObject(newState);
    });

});

describe('new party action', () => {
    it('should return new start party', () => {
        const originalState = initialState();
        const newState = {
            ...initialState(),
            gameIsStarted: true
        };
        expect(reducer(originalState, startPartySuccess())).toMatchObject(newState);
    });

});

describe('get piece action', () => {
    it('should return get piece', () => {
        const state = {
            board: cloneDeep(board),
            current: undefined,
            pieces: [],
            indexPieces: 0,
            socket: socket
        };
        state.board[5].color = 'red';
        expect(reducer(state, getPiece())).toMatchObject({
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
        expect(reducer(state, getPiece())).toMatchObject({
            ...state,
            board: cloneDeep(board),
            current: 'piece',
            indexPieces: state.indexPieces + 1
        });
    });
});

describe('move piece action', () => {
    it('should return move piece', () => {
        expect(reducer(initialState(), movePiece('BOTTOM'))).toMatchObject(initialState());
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
        expect(reducer(formerState, movePiece(BOTTOM))).toMatchObject(newState);
    });

});

describe('join room action', () => {
    it('should return new state', () => {
        const action = joinRoomSuccess('befuhro', '101', null, [], true);
        expect(reducer(initialState(), action)).toMatchObject({
            ...initialState(),
            username: 'befuhro',
            room: '101',
            socket: null,
            players: [],
            isRoomLeader: true
        });
    });

    it('should return state with new errors', () => {
        expect(reducer(initialState(), joinRoomFailure(['The room is full.'])))
            .toMatchObject({
                ...initialState(),
                errors: ['The room is full.']
            });
    });

});


describe('update room action', () => {
    it('should return new players', () => {
        const username = 'befuhro';
        const originalState = {
            ...initialState(),
            username: username
        };
        const players = {[username]: {}, 'farfadet de la z2': {}};
        expect(reducer(originalState, updateRoom(players, username))).toMatchObject({
            ...originalState,
            players: {'farfadet de la z2': {}},
            isRoomLeader: true
        })
    });
});

describe('fetch piece action', () => {
    it('should return same state', () => {
        const pieces = [1, 5, 456];
        const originalState = initialState();
        const newState = {
            ...originalState,
            pieces: pieces
        };
        expect(reducer(initialState(), {type: 'FETCH_PIECES_SUCCESS',pieces: pieces})).toMatchObject(newState);
    });

});

describe('test main reducer', () => {
    it('should return return same state', () => {
        expect(reducer(initialState(), {type: null})).toMatchObject(initialState())
    });
});

