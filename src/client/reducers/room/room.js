export const joinRoomSuccess = (state, action) => ({
    ...state,
    username: action.username,
    room: action.room,
    socket: action.socket,
    players: action.players,
    isRoomLeader: action.isRoomLeader
});

export const joinRoomFailure = (state, action) => ({ ...state, errors: state.errors? state.errors : action.errors });

export const updateRoom = (state, action) => {
    const players = action.players;
    if (players[state.username]) delete players[state.username];
    return {
        ...state,
        isRoomLeader: action.leaderName === state.username ? true : null,
        players: players
    };
};
