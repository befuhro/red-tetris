import io from "socket.io-client";
import { roomConnection } from "../../utils/socketConnection";

/*
Room related Actions
*/
export const joinRoom = (username, room) => {
    return (dispatch => {
        const socket = io(window.location.hostname + ':8080/room');
        socket.on("connect", () => {
            socket.emit('join room', { username: username, room: room }, (data) => {
                if (data.connected === true) {
                    console.log(data);
                    roomConnection(socket, dispatch);
                    dispatch(joinRoomSuccess(username, room, socket, data.players, data.isRoomLeader));
                    dispatch(fetchPieces());
                    window.onhashchange = () => {
                        dispatch(leaveRoom());
                        socket.disconnect();
                    };
                }
                else {
                    dispatch(joinRoomFailure(data.reasons));
                }
            });
        });
    });
};

export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const joinRoomSuccess = (username, room, socket, players, isRoomLeader) =>
    ({ type: JOIN_ROOM_SUCCESS,
        username: username, room: room, socket: socket, players: players, isRoomLeader: isRoomLeader });

export const JOIN_ROOM_FAILURE = "JOIN_ROOM_FAILURE";
export const joinRoomFailure = errors => ({ type: JOIN_ROOM_FAILURE, errors: errors });

export const LEAVE_ROOM = "LEAVE_ROOM";
export const leaveRoom = () => ({ type: LEAVE_ROOM });

export const UPDATE_ROOM = "UPDATE_ROOM";
export const updateRoom = (players, leaderName) => ({ type: UPDATE_ROOM, players: players, leaderName: leaderName });

/*
Spectrum related actions.
*/
export const UPDATE_SPECTRUM = 'UPDATE_SPECTRUM';
export const updateSpectrum = (playerName, spectrum) => ({type: UPDATE_SPECTRUM, playerName: playerName, spectrum: spectrum});

/*
Pieces related actions.
*/
export const GET_PIECE = 'GET_PIECE';
export const getPiece = () => ({ type: GET_PIECE });

export const fetchPieces = () => {
    return ((dispatch, getState) => {
        const socket = getState().room.socket;
        const indexPiece = getState().room.indexPieces;
        socket.emit("fetch pieces", indexPiece, (data) => {
            if (data.pieces !== null) {
                dispatch(fetchPiecesSuccess(data.pieces));
            } else {
                dispatch(fetchPiecesFailure());
            }
        });
    });
};

export const askPiece = () => {
    return ((dispatch, getState) => {
        const numberOfPieces = getState().room.pieces.length;
        if (numberOfPieces <= 5) {
            dispatch(fetchPieces());
        }
        dispatch(getPiece());
    })
};

export const FETCH_PIECES_SUCCESS = "FETCH_PIECES_SUCCESS";
export const fetchPiecesSuccess = (pieces) => ({type: FETCH_PIECES_SUCCESS, pieces: pieces});

export const FETCH_PIECES_FAILURE = "FETCH_PIECES_FAILURE";
export const fetchPiecesFailure = () => ({type: FETCH_PIECES_FAILURE});

export const MOVE_PIECE = 'MOVE_PIECE';
export const movePiece = (direction) => ({type: MOVE_PIECE, direction: direction});

export const ROTATE_PIECE = 'ROTATE_PIECE';
export const rotatePiece = () => ({type: ROTATE_PIECE});

export const CHANGE_INTERVAL = 'CHANGE_INTERVAL';
export const changeInterval = (interval) => ({type: CHANGE_INTERVAL, interval: interval});

/*
Party related actions.
*/
export const START_PARTY = "START_PARTY";
export const startParty = () => {
    return ((dispatch, getState) => {
        const socket = getState().room.socket;
        socket.emit("start party", (data) => {
            if (data.authorizedToLaunchParty === true) {
                dispatch(startPartySuccess());
                dispatch(askPiece());
            }
            else {
                dispatch(startPartyFailure());
            }
        });
    });
};

export const START_PARTY_SUCCESS = "START_PARTY_SUCCESS";
export const startPartySuccess = () => ({ type: START_PARTY_SUCCESS });

export const START_PARTY_FAILURE = "START_PARTY_FAILURE";
export const startPartyFailure = () => ({ type: START_PARTY_FAILURE });
