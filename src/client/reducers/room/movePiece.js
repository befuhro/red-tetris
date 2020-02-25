import getNewPosition from "../../utils/getNewPosition";

export const movePiece = (state, action) => ({
    ...state,
    current: state.current ? {
        ...state.current,
        previousPosition: state.current.position,
        position: getNewPosition(state.current.position, action.direction)
    } : null
});
