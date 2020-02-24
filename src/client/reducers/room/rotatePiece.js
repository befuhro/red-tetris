export const rotatePiece = (state) => {
    if (state.current) {
        const rotation = state.current.rotation[state.current.indexRotation - 1];
        return {
            ...state,
            current: {
                ...current,
                indexRotation: state.current.indexRotation < 4 ? state.current.indexRotation + 1 : 1,
                lastMove: Math.floor(Date.now() / 100),
                position: state.current.position.map((position, index) => ({
                    column: position.column + rotation[index].column,
                    row: position.row + rotation[index].row
                }))
            }
        }
    }
    return state;
};
