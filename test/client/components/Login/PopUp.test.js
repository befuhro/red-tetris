import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

import PopUp from  '../../../../src/client/components/Login/PopUp';

describe('<PopUp />', () => {
    let component;

   beforeAll(() => {
       component = enzyme.mount(<PopUp deleteErrors={() => {}} errors={[{id:0, message:'room is full'}]}/>);
   });

   it('basic test', () => {
       expect(component.html()).toMatchSnapshot();
   });
});
