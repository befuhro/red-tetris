const createNewBoard = (board, nbLines) => {
    for (let i = 0; i < nbLines; i++) {
        for (let i = 0; i < 10; i++) {
            board.shift();
            board.push({color: 'realwhite'})
        }
    }
    for (let index = 0; index < 200; index++) {
        board[index].row = Math.floor(index / 10);
        board[index].column = index % 10;
    }
    return board;
};

export const addLines = (state, action) => ({
    ...state,
    board: createNewBoard(state.board, action.numberOfLines)
});
