import React from 'react';

import GameWatcher from "../../containers/Room/GameWatcher";
import GameController from '../../containers/Room/GameController';
import Board from '../../containers/Room/Board';
import PopUp from './PopUp';
import Footer from "../shared/Footer";


const gameStyle = {
    display: 'flex',
    justifyContent: 'space-around'
};

export default ({dispatch, errors}) => {
    return (
        <div>
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
    );
}
