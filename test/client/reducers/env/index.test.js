import { checkAvailabilityFailure, deleteErrors} from "../../../../src/client/actions/env";
import reducer, {initialState} from '../../../../src/client/reducers/env';

describe('env reducer', () => {
   it('check avail failure', () => {
      expect(reducer(initialState(), checkAvailabilityFailure(['test'])))
          .toMatchObject({errors: ['test']})
   })

   it('check avail failure', () => {
      expect(reducer(initialState(), deleteErrors()))
          .toMatchObject(initialState())
   })
});
