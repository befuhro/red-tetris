import clone from "lodash/clone";
import {putCurrentToBoard} from "../../utils/newPiece";
import {getCompleteLines, removeCompleteLines} from "../../utils/removeCompleteLines";

const createSpectrum = (board) => {
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
    return spectrum
};

const updateSpectrum = (socket, board) => {
    const spectrum = createSpectrum(board);
    socket.emit('piece placed', spectrum, (data) => {
    });
};

const checkEndParty = (board, piece) => {
    let finished = false;
    if (piece) {
        piece.position.forEach(bloc => {
            if (board[bloc.column + (bloc.row * 10)].color !== 'white') {
                finished = true;
            }
        });
    }
    return finished;
};

const endParty = socket => {
    socket.emit('player ended', (data) => console.log(data));
};

export const getPiece = (state) => {
    let newState = clone(state);
    newState.board = putCurrentToBoard(state.board, state.current);
    // Remove complete lines
    const completeLines = getCompleteLines(state.board);
    if (completeLines.length !== 0) {
        newState.board = removeCompleteLines(state.board, completeLines);
    }
    newState.pieces.shift();
    newState.indexPieces++;
    newState.current = state.pieces[0] ? state.pieces[0] : null;
    if (checkEndParty(newState.board, newState.current)) endParty(newState.socket);
    updateSpectrum(newState.socket, newState.board);
    return (newState);
};
