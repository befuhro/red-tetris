import { TOP, BOTTOM, LEFT, RIGHT } from "../../../src/client/utils/direction";
import getNewPosition from "../../../src/client/utils/getNewPosition";

describe('get new position', () => {
    it('NULL', () => {
        const position =  [{column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}];
        expect(getNewPosition(position, null)).toMatchObject(position);
    });

    it('TOP', () => {
        const originalPosition =  [{column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}];
        const newPosition =  [{column: 3, row: 7}, {column: 3, row: 8}, {column: 4, row: 8}, {column: 5, row: 8}];
        expect(getNewPosition(originalPosition, TOP)).toMatchObject(newPosition);
    });

    it('BOTTOM', () => {
        const originalPosition =  [{column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}];
        const newPosition =  [{column: 3, row: 9}, {column: 3, row: 10}, {column: 4, row: 10}, {column: 5, row: 10}];
        expect(getNewPosition(originalPosition, BOTTOM)).toMatchObject(newPosition);
    });

    it('LEFT', () => {
        const originalPosition =  [{column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}];
        const newPosition =  [{column: 2, row: 8}, {column: 2, row: 9}, {column: 3, row: 9}, {column: 4, row: 9}];
        expect(getNewPosition(originalPosition, LEFT)).toMatchObject(newPosition);
    });

    it('RIGHT', () => {
        const originalPosition =  [{column: 3, row: 8}, {column: 3, row: 9}, {column: 4, row: 9}, {column: 5, row: 9}];
        const newPosition =  [{column: 4, row: 8}, {column: 4, row: 9}, {column: 5, row: 9}, {column: 6, row: 9}];
        expect(getNewPosition(originalPosition, RIGHT)).toMatchObject(newPosition);
    });
});
