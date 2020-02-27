import clone from "lodash/clone";
import { CHECK_AVAILABILITY_FAILURE, DELETE_ERRORS, DISPLAY_ERROR} from "../../actions/env";

const initialState = () => ({
    errors: null,
});

function checkAvailabilityFailure(state, action) {
    let newState = clone(state);

    newState.errors = action.errors;
    return (newState);
}

function deleteErrors(state) {
    let newState = clone(state);

    newState.errors = null;
    return (newState);
}

function login(state = initialState(), action) {
    switch (action.type) {
        case CHECK_AVAILABILITY_FAILURE:
            return (checkAvailabilityFailure(state, action));
        case DELETE_ERRORS:
            return (deleteErrors(state));

        default:
            return (state);
    }
}

export default login;
