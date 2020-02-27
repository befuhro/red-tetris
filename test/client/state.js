export default class {
    constructor() {
        this.state = {
            login: {errors: null},
            room: {
                board: Array(200).fill({color: "white"}).map((square, index) => (
                    {...square, row: Math.floor(index / 10), column: index % 10})),
                current: {
                    position: [{column: 4, row: 4}, {column: 4, row: 5}, {column: 4, row: 6}, {column: 4, row: 7}],
                    indexRotation: 1,
                    rotation: [
                        [{column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2}],
                        [{column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2}],
                        [{column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1}],
                        [{column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1}],
                    ],
                    color: 'lightblue',
                },
                pieces: [
                    {
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    },
                    {
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    },
                    {
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    },
                    {
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    },
                    {
                        position: [{column: 4, row: 0}, {column: 4, row: 1}, {column: 4, row: 2}, {column: 4, row: 3}],
                        indexRotation: 1,
                        rotation: [
                            {column: -1, row: 1}, {column: 0, row: 0}, {column: 1, row: -1}, {column: 2, row: -2},
                            {column: 2, row: -1}, {column: 1, row: 0}, {column: 0, row: 1}, {column: -1, row: 2},
                            {column: 1, row: 2}, {column: 0, row: 1}, {column: -1, row: 0}, {column: -2, row: -1},
                            {column: -2, row: -2}, {column: -1, row: -1}, {column: 0, row: 0}, {column: 1, row: 1},
                        ],
                        color: 'lightblue',
                    }
                ],
                intervalMove: 250,
                indexPieces: 0,
                username: 'befuhro',
                room: '101',
                gameIsStarted: null,
                socket: null,
                isRoomLeader: true,
                players: {},
                errors: null,
            }
        }
        ;
    }

    getState() {
        return this.state
    }

    dispatch() {}
};
