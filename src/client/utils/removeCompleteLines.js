export const getCompleteLines = (board) => {
    let lines = [];
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[i * 10 + j].color === 'white') break;
            if (j === 9) lines.push(i);
        }
    }
    return lines;
};

export const removeCompleteLines = (board, completeLines) => {
    let tmpBoard = board.filter(block => !completeLines.includes(block.row));
    for (let toAdd = 200 - tmpBoard.length; toAdd > 0; toAdd--) {
        tmpBoard.unshift({color: 'white'});
    }
    return tmpBoard.map((bloc, index) =>  ({...bloc, row: Math.floor(index / 10), column: index % 10}))
};
