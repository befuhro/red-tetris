import React from 'react';

const squareStyle = {
    height: '2.5vh',
    width: '2.5vh',
    borderStyle: 'outset',
    borderWidth: '0.2vh',
    borderColor: '#749099'
};

const realWhiteSquare = {backgroundColor: '#ffffff'};
const whiteSquare = {backgroundColor: '#5a6978'};
const redSquare = {backgroundColor: '#e12108'};
const darkblueSquare = {backgroundColor: '#262ee6'};
const yellowSquare = {backgroundColor: '#feef0c'};
const greenSquare = {backgroundColor: '#76f541'};
const lightblueSquare = {backgroundColor: '#16e3dc'};
const purpleSquare = {backgroundColor: '#b500ec'};
const orangeSquare = {backgroundColor: '#ff9b00'};

export default ({color, size}) => {
    switch (color) {
        case 'realwhite':
            return <div style={{...squareStyle, ...realWhiteSquare, ...size}} > </div>;
        case 'red':
            return <div style={{...squareStyle, ...redSquare, ...size}} > </div>;
        case 'darkblue':
            return <div style={{...squareStyle, ...darkblueSquare, ...size}} > </div>;
        case 'yellow':
            return <div style={{...squareStyle, ...yellowSquare, ...size}} > </div>;
        case 'green':
            return <div style={{...squareStyle, ...greenSquare, ...size}} > </div>;
        case 'lightblue':
            return <div style={{...squareStyle, ...lightblueSquare, ...size}} > </div>;
        case 'purple':
            return <div style={{...squareStyle, ...purpleSquare, ...size}} > </div>;
        case 'orange':
            return <div style={{...squareStyle, ...orangeSquare, ...size}} > </div>;
        default:
            return <div style={{...squareStyle, ...whiteSquare, ...size}} > </div>;
    }
}
