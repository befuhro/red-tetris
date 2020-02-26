import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});

import Board from '../../../../src/client/components/Room/Board';

describe('<Board>', () => {
    let component;

    beforeAll(() => {
        component = enzyme.mount(<Board
            board={Array(200).fill({color: "white"}).map((square, index) => (
                {...square, row: Math.floor(index / 10), column: index % 10}))}
        />);
    });
    it('should render board', () => expect(component.html()).toMatchSnapshot());
});
