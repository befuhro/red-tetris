import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

import GameController from '../../containers/Room/GameController';
import GameWatcher from "../../containers/Room/GameWatcher";

import { joinRoom } from "../../actions/room";
import { askPiece, movePiece, rotatePiece } from "../../actions/room";
import {BOTTOM, LEFT, RIGHT} from "../../utils/direction";

import Board from '../../containers/Room/Board';
import PopUp from './PopUp';
import Footer from "../shared/Footer";

WebFont.load({google: {families: ['Permanent Marker', 'Orbitron: black']}});

const gameStyle = {
    display: 'flex',
    justifyContent: 'space-around'
};

function handleKey(event, dispatch) {
    switch (event.key) {
        case 'ArrowLeft':
            dispatch(movePiece(LEFT));
            break;
        case 'ArrowRight':
            dispatch(movePiece(RIGHT));
            break;
        case 'ArrowDown':
            dispatch(movePiece(BOTTOM));
            break;
        case 'ArrowUp':
            dispatch(rotatePiece());
            break;
        case ' ':
            dispatch(askPiece());
            break;
    }
}

export default ({dispatch, errors, match: {params}}) => {

    useEffect(() => {
        dispatch(joinRoom(params.player, params.room));
    }, []);

    return (
        <div onKeyDown={(e) => handleKey(e, dispatch)} tabIndex={0} >
            {errors === null ?
                <div style={gameStyle}>
                    <GameWatcher/>
                    <Board/>
                    <GameController/>
                </div>
                :
                <PopUp errors={errors}/>
            }
            <Footer/>
        </div>
    )
}