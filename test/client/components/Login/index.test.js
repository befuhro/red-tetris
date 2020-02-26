import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

import Login from '../../../../src/client/components/Login';

describe('<Login />', () => {
   describe('no click', () => {
       let component;

       beforeAll(() => {
           component = enzyme.mount(<Login
               checkAvailability={() => {}}
               deleteErrors={() => {}}
               errors={[{id:0, message:'room is full'}]}
           />);
       });

       it('basic test', () => {
           expect(component.html()).toMatchSnapshot();
       });
   });
});
