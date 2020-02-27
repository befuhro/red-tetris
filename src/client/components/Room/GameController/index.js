import React from 'react';

import PieceView from './PieceView';
import { startParty} from "../../../actions/room";

const gameControllerStyle = {
    justifySelf: 'end',
    width: '22vh',
    height: '70vh',
    margin: '12.8vh 0 0 0',
    padding: '2vh 2vh 0 2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0b1d2d',
    borderColor: '#0b1d2d',
    borderWidth: '1vh 2vh 0 2vh',
    borderStyle: 'outset',
};

const buttonStyle = {
    padding: '1vh',
    fontFamily: 'Orbitron',
    fontWeight: '500',
    fontSize: '2vh',
    textAlign: 'center',
    color: '#e1301d',
    backgroundColor: '#5a6978',
    borderColor: '#0f1423',
    borderWidth: '1vh 1vh 1vh 1vh',
    borderRadius: '1vh 1vh 1vh 1vh',
    borderStyle: 'outset'
};

function StartButton({isRoomLeader, gameIsStarted, dispatch}) {
    return (
        <div>
            {isRoomLeader && gameIsStarted !== true ?
                <button style={buttonStyle} onClick={() => dispatch(startParty())}>Start Game</button>
                :
                null
            }
        </div>
    );
}

export default ({isRoomLeader, gameIsStarted, firstPiece, secondPiece, thirdPiece, socket, dispatch}) => {
    return (
        <div style={gameControllerStyle}>
            <div>
                <PieceView piece={thirdPiece}/>
                <PieceView piece={secondPiece}/>
                <PieceView piece={firstPiece}/>
            </div>
            <StartButton isRoomLeader={isRoomLeader} gameIsStarted={gameIsStarted} dispatch={dispatch}/>
        </div>);
}
