import clone from "lodash/clone";

export const putCurrentToBoard = (board, current) => {
    if (current) {
        let newBoard = clone(board);
        current.position.forEach((pos) => newBoard[pos.row * 10 + pos.column].color = current.color);
        return (newBoard);
    }
    return (board);
};
