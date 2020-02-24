import {
    JOIN_ROOM_SUCCESS,
    JOIN_ROOM_FAILURE,
    UPDATE_SPECTRUM,
    START_PARTY_SUCCESS,
    FETCH_PIECES_SUCCESS,
    GET_PIECE,
    MOVE_PIECE,
    ROTATE_PIECE,
    UPDATE_ROOM,
    CHANGE_INTERVAL
} from "../../actions/room";

import {joinRoomFailure, updateRoom, joinRoomSuccess} from "./room";
import {startParty} from "./startParty";
import {movePiece} from "./movePiece";
import {getPiece} from "./getPiece";
import {rotatePiece} from "./rotatePiece";
import {fetchPieces} from "./fetchPieces";
import {updateSpectrum} from "./spectrum";
import {changeInterval} from "./changeInterval";

export const initialState = () => ({
    board: Array(200).fill({color: "white"}).map((square, index) => (
        {...square, ...{row: Math.floor(index / 10), column: index % 10}})),
    current: null,
    pieces: [],
    intervalMove: 250,
    indexPieces: 0,
    username: null,
    room: null,
    gameIsStarted: null,
    socket: null,
    isRoomLeader: null,
    players: {},
    errors: null
});

export default (state = initialState(), action) => {
    switch (action.type) {
        case JOIN_ROOM_SUCCESS:
            return joinRoomSuccess(state, action);
        case JOIN_ROOM_FAILURE:
            return joinRoomFailure(state, action);
        case START_PARTY_SUCCESS:
            return (startParty(state));
        case FETCH_PIECES_SUCCESS:
            return (fetchPieces(state, action));
        case GET_PIECE:
            return (getPiece(state));
        case MOVE_PIECE:
            return (movePiece(state, action));
        case ROTATE_PIECE:
            return rotatePiece(state);
        case UPDATE_ROOM:
            return (updateRoom(state, action));
        case UPDATE_SPECTRUM:
            return (updateSpectrum(state, action));
        case CHANGE_INTERVAL:
            return (changeInterval(state, action));
        default:
            return state;
    }
}
