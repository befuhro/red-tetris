import {askPiece, getPiece, MOVE_PIECE} from "../../actions/room";
import {BOTTOM} from "../../utils/direction";
import checkNewPosition from "../../utils/checkNewPosition";
import getNewPosition from "../../utils/getNewPosition";

const movePieceMiddleware = store => next => action => {
    if (action.type === MOVE_PIECE && store.getState().room.current !== null) {
        const board = store.getState().room.board;
        const position = store.getState().room.current.position;
        const newPosition = getNewPosition(position, action.direction);
        if (checkNewPosition(position, newPosition, board) === true) {
            next(action);
        }
        else {
            if (action.direction === BOTTOM) {
                store.dispatch(askPiece());
            }
        }
    }
    else if (action.type === MOVE_PIECE && store.getState().room.current === null) {}
    else {
        next(action);
    }
};

export default movePieceMiddleware;
