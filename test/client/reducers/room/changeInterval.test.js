import {changeInterval as changeIntervalReducer} from "../../../../src/client/reducers/room/changeInterval";
import {changeInterval as changeIntervalReducerAction} from "../../../../src/client/actions/room";

import {initialState} from "../../../../src/client/reducers/room";

describe('test changeInterval', () => {
    it('should return return same state', () => {
        expect(changeIntervalReducer(initialState(), changeIntervalReducerAction(250)))
            .toMatchObject(initialState())
    });
    it('should return return same state with different interval', () => {
        expect(changeIntervalReducer(initialState(), changeIntervalReducerAction(500)))
            .toMatchObject({...initialState(), intervalMove: 500})
    });
});
