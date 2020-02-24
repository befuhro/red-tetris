import getNewPosition from "../../utils/getNewPosition";

export const movePiece = (state, action) => ({
    ...state,
    current: state.current ? {
        ...state.current,
        previousPosition: state.current && state.current.position ? state.current.position : null,
        position: getNewPosition(state.current.position, action.direction)
    } : null
});
