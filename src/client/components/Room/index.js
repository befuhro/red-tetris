import React, {useEffect} from 'react';
import WebFont from 'webfontloader';

import {clearError, joinRoom, movePiece, rotatePiece} from "../../actions/room";
import {BOTTOM, LEFT, RIGHT, LOWEST} from "../../utils/direction";

import Wrapper from '../../containers/Room/Wrapper'

WebFont.load({google: {families: ['Permanent Marker', 'Orbitron: black']}});

export function handleKey(dispatch) {
    return function (e) {
        switch (e.key) {
            case 'ArrowLeft':
                dispatch(movePiece(LEFT));
                break;
            case 'ArrowRight':
                dispatch(movePiece(RIGHT));
                break;
            case 'ArrowDown':
                dispatch(movePiece(BOTTOM));
                break;
            case ' ':
                dispatch(movePiece(LOWEST));
                break;
            case 'ArrowUp':
                dispatch(rotatePiece());
                break;
            default:
                break;
        }
    }
}

export default ({dispatch, match: {params}}) => {

    useEffect(() => {
        dispatch(joinRoom(params.player, params.room));
        const interval = setInterval(() => {
            dispatch(movePiece(BOTTOM));
        }, 250);

        const curriedEvent = handleKey(dispatch);
        document.addEventListener('keydown', curriedEvent);

        return () => {
            clearInterval(interval);
            dispatch(clearError());
            document.removeEventListener('keydown', curriedEvent);
        }
    }, []);

    return (
        <div id="main-game" onKeyDown={(e) => handleKey(e, dispatch)} tabIndex={0}>
            <Wrapper/>
        </div>
    )
}
