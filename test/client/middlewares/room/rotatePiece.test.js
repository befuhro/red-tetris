import rotatePieceMiddleware from '../../../../src/client/middlewares/room/rotatePiece';
import {
    rotatePiece as rotatePieceAction,
    movePiece as movePieceAction
} from "../../../../src/client/actions/room";
import {BOTTOM, RIGHT, TOP, LEFT} from "../../../../src/client/utils/direction";
import Store from "../../state";

describe('rotate piece middleware', () => {
    let store = new Store();

    it('basic test', () => {
        rotatePieceMiddleware(store)
        (action => expect(action).toMatchObject(rotatePieceAction()))
        (rotatePieceAction())
    });

    it('error side left test', () => {
        store.state.room.current.position = [{column: 0, row: 0}, {column: 0, row: 1}, {column: 0, row: 2}, {column: 0, row: 3}];
        rotatePieceMiddleware(store)
        (action => expect(action).toMatchObject(movePieceAction(RIGHT)))
        (rotatePieceAction())
    });

    it('error side right test', () => {
        store.state.room.current.position = [{column: 9, row: 0}, {column: 9, row: 1}, {column: 9, row: 2}, {column: 9, row: 3}];
        rotatePieceMiddleware(store)
        (action => expect(action).toMatchObject(movePieceAction(LEFT)))
        (rotatePieceAction())
    });


    it('full board test', () => {
        store.state.room.board = store.state.room.board.map(bloc => ({...bloc, color: 'red'}));
        rotatePieceMiddleware(store)
        (action => expect(action).toMatchObject(movePieceAction(TOP)))
        (rotatePieceAction())
    });

    it('no rotate piece test', () => {
        store.state.room.board = store.state.room.board.map(bloc => ({...bloc, color: 'red'}));
        rotatePieceMiddleware(store)
        (action => expect(action).toMatchObject({type: 'no rotate piece'}))
        ({type: 'no rotate piece'})
    });
});
