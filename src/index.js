import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './client/reducers';
import Login from './client/containers/Login';
import Room from './client/containers/Room';
import rotatePieceMiddleware from './client/middlewares/room/rotatePiece'
import movePieceMiddleware from './client/middlewares/room/movePiece'
import './client/assets/style.css';

const loggerMiddleware = createLogger();

const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware,
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
