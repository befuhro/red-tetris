import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import Board from '../../components/Room/Board';

const insertCurrentIntoBoard = (board, current) => {
    if (current) {
        for (let i = 0; i < 4; i++) {
            board[(current.position[i].row * 10) + current.position[i].column].color = current.color;
        }
    }
    return (board);
};

const mapStateToProps = (state) => {
    let board = cloneDeep(state.room.board);
    board = state.room.current ? insertCurrentIntoBoard(board, state.room.current) : board;
    return ({board: board});
};

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
