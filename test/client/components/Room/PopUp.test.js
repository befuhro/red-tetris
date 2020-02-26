import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from "react-router-dom";

enzyme.configure({adapter: new Adapter()});

import PopUp from '../../../../src/client/components/Room/PopUp';

describe('<PopUp>', () => {
    let component;
    beforeAll(() => {
        component = enzyme.mount(
            <MemoryRouter initialEntries={['/']}>
                <PopUp
                    errors={[{id: 0, message: 'the room is full'}]}
                />
            </MemoryRouter>)
    });
    it('should render pop up with error', () => expect(component.html()).toMatchSnapshot());
});
