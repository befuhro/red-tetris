import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});

import PieceView from '../../../../../src/client/components/Room/GameController/PieceView';

describe('<Piece>', () => {
    let component;

    beforeAll(() => {
        component = enzyme.mount(<PieceView
            piece={undefined}
        />)
    });
    it('should return PieceView undefined', () => expect(component.html()).toMatchSnapshot());
});
