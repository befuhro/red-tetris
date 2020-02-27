import {PLAYER_LOST, displayError} from "../../actions/room";

const playerLostMiddleWare = store => next => action => {
    if (action.type === PLAYER_LOST) {
        const username = store.getState().room.username;
        if (username === action.username) {
            console.log('You lost!!!!!!');
            store.dispatch(displayError('you lost'));
        }
    }
    next(action);
};

export default playerLostMiddleWare;
