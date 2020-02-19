import clone from "lodash/clone";
import {putCurrentToBoard} from "../../utils/newPiece";
import {getCompleteLines, removeCompleteLines} from "../../utils/removeCompleteLines";

const updateSpectrum = (socket, board) => {
    let spectrum = [];
    board.forEach((bloc, index) => {
        const row = Math.floor(index / 10);
        const column = index % 10;
        if (column === 0) {
            spectrum[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (bloc.color !== 'white') {
            spectrum[row][column] = 1;
        }
    });
    socket.emit('update spectrum', spectrum);
};

export const getPiece = (state) => {
    const piece = state.pieces[0];
    let newState = clone(state);
    newState.board = putCurrentToBoard(state.board, state.current);
    // Remove completed lines
    const completeLines = getCompleteLines(state.board);
    if (completeLines.length !== 0) {
        newState.board = removeCompleteLines(state.board, completeLines);
    }
    newState.pieces.shift();
    newState.indexPieces++;
    newState.current = piece;
    updateSpectrum(newState.socket, newState.board);
    return (newState);
};
