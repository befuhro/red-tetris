import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

import Footer from '../../../../src/client/components/shared/Footer';

describe('<Footer />', () => {
    let component;

    beforeAll(() => {
        component = enzyme.mount(<Footer/>);
    });

    it('render basic', () => {
        expect(component.html()).toMatchSnapshot();
    });
});
