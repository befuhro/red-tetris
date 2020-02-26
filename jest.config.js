/* eslint-disable */
module.exports = {
    "verbose": true,
    "transform": {
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest",
    },
    "moduleNameMapper":{
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
    },
    "globals": {
        "NODE_ENV": "test"
    },
    "moduleFileExtensions": [
        "js",
        "jsx",
        "json"
    ]
};
