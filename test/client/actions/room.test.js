import * as actions from '../../../src/client/actions/room';

describe('room: basic actions', () => {
    // joinRoomSuccess
    it('should create joinRoomSuccess action', () => {
        const username = 'farfadet';
        const room = '101';
        const players = {};
        const isRoomLeader = true;
        const expectedAction = {
            type: actions.JOIN_ROOM_SUCCESS,
            username: username,
            socket: null,
            room: room,
            players: players,
            isRoomLeader: isRoomLeader
        };
        expect(actions.joinRoomSuccess(username, room, null, players, isRoomLeader)).toEqual(expectedAction);
    });

    // joinRoomFailure
    it('should create joinRoomFailure action', () => {
        const reasons = ['The room is full.', 'The username is already used.'];
        const expectedAction = {
            type: actions.JOIN_ROOM_FAILURE,
            errors: reasons
        };
        expect(actions.joinRoomFailure(reasons)).toEqual(expectedAction);
    });

    // leaveRoom
    it('should create leaveRoom action', () => {
        const expectedAction = { type: actions.LEAVE_ROOM };
        expect(actions.leaveRoom()).toEqual(expectedAction);
    });

    // updateRoom
    it('should create updateRoom action', () => {
        const players = {};
        const leaderName = 'farfadet';
        const expectedAction = {
            type: actions.UPDATE_ROOM,
            players: players,
            leaderName: leaderName
        };
        expect(actions.updateRoom(players, leaderName)).toEqual(expectedAction);
    });

    // updateSpectrum
    it('should create updateSpectrum action', () => {
        const playerName = 'farfader';
        const spectrum = [];
        const expectedAction = {
            type: actions.UPDATE_SPECTRUM,
            playerName: playerName,
            spectrum: spectrum
        };
        expect(actions.updateSpectrum(playerName, spectrum)).toEqual(expectedAction);
    });

    // getPiece
    it('should create updateSpectrum action', () => {
        const expectedAction = {type: actions.GET_PIECE};
        expect(actions.getPiece()).toEqual(expectedAction);
    });

    // fetchPiecesSuccess
    it('should create fetchPiecesSuccess action', () => {
        const pieces = [];
        const expectedAction = {
            type: actions.FETCH_PIECES_SUCCESS,
            pieces: pieces
        };
        expect(actions.fetchPiecesSuccess(pieces)).toEqual(expectedAction);
    });

    // fetchPiecesFailure
    it('should create fetchPiecesSuccess action', () => {
        const expectedAction = {type: actions.FETCH_PIECES_FAILURE,};
        expect(actions.fetchPiecesFailure()).toEqual(expectedAction);
    });

    // movePiece
    it('should create movePiece action', () => {
        const direction = '';
        const expectedAction = {
            type: actions.MOVE_PIECE,
            direction: direction
        };
        expect(actions.movePiece(direction)).toEqual(expectedAction);
    });

    // rotatePiece
    it('should create rotatePiece action', () => {
        const expectedAction = {type: actions.ROTATE_PIECE};
        expect(actions.rotatePiece()).toEqual(expectedAction);
    });

    // changeInterval
    it('should create changeInterval action', () => {
        const interval = 100;
        const expectedAction = {
            type: actions.CHANGE_INTERVAL,
            interval: interval
        };
        expect(actions.changeInterval(interval)).toEqual(expectedAction);
    });

    // startPartySuccess
    it('should create startPartySuccess action', () => {
        const expectedAction = {type: actions.START_PARTY_SUCCESS};
        expect(actions.startPartySuccess()).toEqual(expectedAction);
    });

    // startPartyFailure
    it('should create startPartyFailure action', () => {
        const expectedAction = {type: actions.START_PARTY_FAILURE};
        expect(actions.startPartyFailure()).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    // it('should create leaveRoom action', () => {
    //     const expectedAction = { type: actions.LEAVE_ROOM };
    //     expect(actions.leaveRoom()).toEqual(expectedAction);
    // });
});
