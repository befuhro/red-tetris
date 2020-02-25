import * as actions from '../../../src/client/actions/env';

describe('room: basic actions', () => {
    // checkAvailabilityFailure
    it('should create checkAvailabilityFailure action', () => {
        const reasons = ['The room is full.', 'The username is already used.'];
        const expectedAction = {
            type: actions.CHECK_AVAILABILITY_FAILURE,
            errors: reasons
        };
        expect(actions.checkAvailabilityFailure(reasons)).toEqual(expectedAction);
    });

    // deleteErrors
    it('should create checkAvailabilityFailure action', () => {
        const expectedAction = {type: actions.DELETE_ERRORS};
        expect(actions.deleteErrors()).toEqual(expectedAction);
    });
});
