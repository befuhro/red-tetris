import React from 'react';
import { Link } from 'react-router-dom';

const backgroundPopUp = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

const popUp = {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    backgroundColor: '#0b1d2d',
};

const errorFont = {
    color: '#61dafb',
    fontFamily: 'sans-serif',
    margin: '10px 20px 10px 20px',
};

const link = {
    fontFamily: 'sans-serif',
    backgroundColor: 'white',
    width: 'fit-content',
    padding: '5px',
    color: 'black',
    textDecoration: 'none',
    borderRadius: '5px',
};

function PopUp({errors}) {
    return (
        <div style={backgroundPopUp}>
            <div style={popUp}>
                {errors.map((error) => <p key={error.id} style={errorFont}>{error.message}</p>)}
                <Link style={link} to="/">Login Page</Link>
            </div>
        </div>
    )
}

export default PopUp;
