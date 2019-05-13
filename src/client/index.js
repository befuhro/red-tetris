import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './Store/Reducers/index.js';
import Login from './app/login/Login';
import Room from './app/room/Room';
import rotatePieceMiddleware from './app/room/Middlewares/RotatePiece'
import movePieceMiddleware from './app/room/Middlewares/MovePiece'
import './assets/style.css';

const loggerMiddleware = createLogger();

const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        rotatePieceMiddleware,
        movePieceMiddleware,
    )
);

render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/:room[:player]' component={ Room } />
                <Route path='/' component={ Login }/>
            </Switch>
        </HashRouter>
    </Provider>
    ,
    document.getElementById('root')
);