import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});

import GameController from '../../../../../src/client/components/Room/GameController';

describe('<GameController>', () => {
    describe('test leader room and game not started', () => {
        let component;

        beforeAll(() => {
            component = enzyme.mount(
                <GameController
                    isRoomLeader={true}
                    gameIsStarted={false}
                    firstPiece={{
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }}
                    secondPiece={{
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }}
                    thirdPiece={{
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }}
                    socket={null}
                    dispatch={null}
                />
            );
        });
        it('should return basic GameController', () => expect(component.html()).toMatchSnapshot());
    });



    describe('test not leader room and game started', () => {
        let component;

        beforeAll(() => {
            component = enzyme.mount(
                <GameController
                    isRoomLeader={false}
                    gameIsStarted={true}
                    firstPiece={{
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }}
                    secondPiece={{
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }}
                    thirdPiece={{
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }}
                    socket={null}
                    dispatch={null}
                />
            );
        });
        it('should return basic GameController', () => expect(component.html()).toMatchSnapshot());
    });
});
