import React from 'react';
import {connect} from 'react-redux';

import PopUp from './PopUp';
import { checkAvailability, deleteErrors } from './loginActions';

const pageStyle = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

const blockStyle = {
    padding: '20px',
    backgroundColor: '#0b1d2d',
};

const fontStyle = {
    margin: '3vh 0 1vh 0',
    color: '#61dafb',
    fontFamily: 'Permanent Marker',
    fontSize: '3vh',
    fontWeight: '300',
    textAlign: 'center',
};

const buttonStyle = {
    width: '15vh',
    marginTop: '1vh',
    fontSize: '2vh',
    fontWeight: '300',
    textAlign: 'center',
};

const form = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

function authenticate(e, checkAvailability) {
    const username = document.getElementById("username").value;
    const room = document.getElementById("room").value;

    e.preventDefault();
    checkAvailability(username, room);
}

function Login({errors, checkAvailability, deleteErrors}) {
    return (
        <div style={pageStyle}>
            <div style={blockStyle}>
                <form style={form} onSubmit={(e) => authenticate(e, checkAvailability)}>
                    <label style={fontStyle}>
                        ENTER A USERNAME
                    </label>
                    <input type="text" id="username" required/>
                    <label style={fontStyle}>
                        ENTER A ROOM
                    </label>
                    <input type="text" id="room" required/>
                    <button style={buttonStyle} type="submit">Join game</button>
                </form>
                {errors !== null && errors !== undefined ?
                    <PopUp
                        errors={errors}
                        deleteErrors={deleteErrors}
                    /> :
                    null
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => (
    {errors: state.login.errors}
);

const mapDispatchToProps = (dispatch) => ({
    checkAvailability: (userName, room) => dispatch(checkAvailability(userName, room)),
    deleteErrors: () => dispatch(deleteErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);