import {updateRoom, askPiece, updateSpectrum, changeInterval, gameStart, playerLost, addLines} from "../actions/room";

export const roomConnection = (socket, dispatch) => {
    // Handle opponent connection and disconnection
    socket.on("opponent connection", (data) => {
        dispatch(updateRoom(data.players, data.leaderName));
    });

    socket.on("opponent disconnection", (data) => {
        dispatch(updateRoom(data.players, data.leaderName));
    });

    socket.on('new spectrum', (data) => dispatch(updateSpectrum(data.username, data.spectrum)));

    socket.on('update interval', (value) => {
        dispatch(changeInterval(value));
    });

    // Handle party launching
    socket.on("launch party", () => {
        dispatch(askPiece());
        dispatch(gameStart());
    });

    socket.on('line lock', (numberOfLines) => dispatch(addLines(numberOfLines)));

    socket.on('player ended', username => dispatch(playerLost(username)));
};
