import React from 'react';

import Square from './Square';
import logo from '../../assets/logo.svg';

const mainBlockStyle = {
    width: '35vh',
    height: '80vh',
    margin: '2.7vh 0 0 0',
    padding: '2vh 2vh 0 2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0b1d2d',
    borderColor: '#0b1d2d',
    borderWidth: '1vh 2vh 0 2vh',
    borderStyle: 'outset',
};

const titleStyle = {
    fontFamily: 'Orbitron',
    fontWeight: '500',
    fontSize: '4vh',
    textAlign: 'center',
    color: '#e1301d'
};

const boardStyle = {
    width: '29vh',
    height: '60vh',
    display: 'flex',
    flexWrap: 'wrap',
    borderColor: '#0f1423',
    borderWidth: '2vh 2vh 1vh 2vh',
    borderRadius: '1vh 1vh 0 0',
    borderStyle: 'inset'
};

export default ({ board }) => {
    return (
        <div style={mainBlockStyle} id={'env'}>
            <img src={logo} className='App-logo' alt='react-logo'/>
            <h1 style={titleStyle}>RED TETRIS</h1>
            <div style={boardStyle}>
                {
                    board.map((square, index) =>
                        <Square
                            key={index}
                            index={index}
                            color={square.color}
                        />)
                }
            </div>
        </div>
    )
}
