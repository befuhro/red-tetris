import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from "react-router-dom";
import {Provider} from 'react-redux';


enzyme.configure({adapter: new Adapter()});

import Room, {handleKey} from '../../../../src/client/components/Room';
import {createStore} from "redux";
import rootReducer from "../../../../src/client/reducers";



const store = createStore(rootReducer);

describe('<Room>', () => {

    describe('basic test', () => {
        let component;

        beforeAll(() => {
            component = enzyme.mount(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <Room
                            dispatch={() => {
                            }}
                            match={{params: {player: 'befuhro', room: '101'}}}
                        />
                    </MemoryRouter>
                </Provider>
            )
        });
        it('basic render', () => expect(component.html()).toMatchSnapshot());
    });

    describe('test handle key', () => {
        it('test key', () => {
            const dispatchTest = object => action => expect(action).toMatchObject(object);
            handleKey(dispatchTest({type: 'MOVE_PIECE', direction: 'LEFT'}))({key: 'ArrowLeft'});
            handleKey(dispatchTest({type: 'MOVE_PIECE', direction: 'RIGHT'}))({key: 'ArrowRight'});
            handleKey(dispatchTest({type: 'MOVE_PIECE', direction: 'BOTTOM'}))({key: 'ArrowDown'});
            handleKey(dispatchTest({type: 'MOVE_PIECE', direction: 'LOWEST'}))({key: ' '});
            handleKey(dispatchTest({type: 'ROTATE_PIECE'}))({key: 'ArrowUp'});
            handleKey(null)({key: 'test'});
        });
    });
});
