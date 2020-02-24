import checkNewPosition from "../../utils/checkNewPosition";
import { movePiece, ROTATE_PIECE } from "../../actions/room";
import { TOP, BOTTOM, LEFT, RIGHT, ALREADY_TAKEN } from "../../utils/direction";

const rotatePieceMiddleware = store => next => action => {
    if (action.type === ROTATE_PIECE && store.getState().room.current !== null) {
        const board = store.getState().room.board;
        const position = store.getState().room.current.position;
        const indexRotation = store.getState().room.current.indexRotation - 1;
        const rotation = store.getState().room.current.rotation[indexRotation];
        let newPosition = position.map((pos, index) => ({column: pos.column + rotation[index].column, row: pos.row + rotation[index].row}));
        const error = checkNewPosition(position, newPosition, board, "rotate");
        if (error === true) {
            next(action);
        }
        else {
            if (error.side === LEFT) {
                next(movePiece(RIGHT));
            }
            else if (error.side === RIGHT) {
                next(movePiece(LEFT));
            }
            else if (error.side === BOTTOM) {
                next(movePiece(TOP));
            }
            else if (error.side === TOP) {
                next(movePiece(BOTTOM));
            }
            else if (error.type === ALREADY_TAKEN) {
                next(movePiece(TOP));
            }
            rotatePieceMiddleware(store)(next)(action);
        }
    }
    else {
        next(action);
    }
};

export default rotatePieceMiddleware;
