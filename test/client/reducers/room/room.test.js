import {initialState} from "../../../../src/client/reducers/room";

import {
    joinRoomSuccess as joinRoomSuccessAction,
    joinRoomFailure as joinRoomFailureAction,
    updateRoom as updateRoomAction
} from "../../../../src/client/actions/room";

import {
    joinRoomSuccess as joinRoomSuccessReducer,
    joinRoomFailure as joinRoomFailureReducer,
    updateRoom as updateRoomReducer
} from "../../../../src/client/reducers/room/room";

describe('joinRoomSuccess reducer', () => {
    it('should return same state', () => {
        const action = joinRoomSuccessAction(null, null, null, {}, null);
        expect(joinRoomSuccessReducer(initialState(), action)).toMatchObject(initialState());
    });

    it('should return new state', () => {
        const action = joinRoomSuccessAction('befuhro', '101', null, [], true);
        expect(joinRoomSuccessReducer(initialState(), action)).toMatchObject({
            ...initialState(),
            username: 'befuhro',
            room: '101',
            socket: null,
            players: [],
            isRoomLeader: true
        });
    });
});

describe('joinRoomFailure reducer', () => {
    it('should return same state', () => {
        expect(joinRoomFailureReducer(initialState(), joinRoomFailureAction(null))).toMatchObject(initialState());
    });

    it('should return state with new errors', () => {
        expect(joinRoomFailureReducer(initialState(), joinRoomFailureAction(['The room is full.'])))
            .toMatchObject({
                ...initialState(),
                errors: ['The room is full.']
            });
    })
});

describe('updateRoom reducer', () => {
    it('should return initial state', () => {
        expect(updateRoomReducer(initialState(), updateRoomAction([], 'farfadet'))).toMatchObject(initialState())
    });

    it('should return new players', () => {
        const username = 'befuhro';
        const originalState = {
            ...initialState(),
            username: username
        };
        const players = {[username]: {}, 'farfadet de la z2': {}};
        expect(updateRoomReducer(originalState, updateRoomAction(players, username))).toMatchObject({
            ...originalState,
            players: {'farfadet de la z2': {}},
            isRoomLeader: true
        })
    });
});
