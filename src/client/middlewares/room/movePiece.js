import {askPiece, MOVE_PIECE, movePiece} from "../../actions/room";
import {BOTTOM, LOWEST} from "../../utils/direction";
import checkNewPosition from "../../utils/checkNewPosition";
import getNewPosition from "../../utils/getNewPosition";

const movePieceMiddleware = store => next => action => {
    if (action.type === MOVE_PIECE && store.getState().room.current !== null) {
        const board = store.getState().room.board;
        const position = store.getState().room.current.position;
        const newPosition = getNewPosition(position, action.direction === LOWEST ? BOTTOM : action.direction);
        if (checkNewPosition(position, newPosition, board) === true) {
            if (action.direction === LOWEST) {
                next(movePiece(BOTTOM));
                store.dispatch(action);
            } else {
                next(action);
            }
        } else {
            if (action.direction === BOTTOM) {
                store.dispatch(askPiece());
            }
        }
    } else {
        next(action);
    }
};

export default movePieceMiddleware;
