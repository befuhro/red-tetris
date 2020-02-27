import {ADD_LINES} from "../../actions/room";

const createSpectrum = (board) => {
    let spectrum = [];
    board.forEach((bloc, index) => {
        const row = Math.floor(index / 10);
        const column = index % 10;
        if (column === 0) {
            spectrum[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (bloc.color !== 'white' && bloc.color !== 'realwhite') {
            spectrum[row][column] = 1;
        }
    });
    return spectrum
};

const addLineToSpectrum = (spectrum, numberOfLines) => {
    for (let i = 0; i < numberOfLines; i++) {
        spectrum.shift();
        spectrum.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }
    return spectrum;
};

const addLinesMiddleware = store => next => action => {
    if (action.type === ADD_LINES) {
        let newSpectrum = createSpectrum(store.getState().room.board);
        newSpectrum = addLineToSpectrum(newSpectrum, action.numberOfLines);
        console.log('Middleware: ', newSpectrum);
        store.getState().room.socket.emit('update spectrum', newSpectrum);
    }
    next(action);
};

export default addLinesMiddleware;
