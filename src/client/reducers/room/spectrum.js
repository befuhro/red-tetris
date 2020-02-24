export const updateSpectrum = (state, action) => ({
    ...state,
    players: {
        ...state.players,
        [action.playerName]: {
            ...state.players[action.playerName],
            spectrum: action.spectrum
        }
    }
});
