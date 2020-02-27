import movePieceMiddleware from '../../../../src/client/middlewares/room/movePiece';
import {BOTTOM, LOWEST} from "../../../../src/client/utils/direction";
import {movePiece as movePieceAction} from '../../../../src/client/actions/room';

import Store from '../../state';

describe('move piece middleware', () => {
    let store = new Store();

    it('lowest test', () => {
        movePieceMiddleware(store)
        (action => expect(action).toMatchObject(movePieceAction(BOTTOM)))
        (movePieceAction(LOWEST))
    });

    it('bottom test', () => {
        movePieceMiddleware(store)
        (action => expect(action).toMatchObject(movePieceAction(BOTTOM)))
        (movePieceAction(BOTTOM))
    });

    it('no move piece test', () => {
        movePieceMiddleware(store)
        (action => expect(action).toMatchObject({type: 'null'}))({type: 'null'})
    });
});
