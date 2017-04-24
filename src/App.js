import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import {Provider} from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import configureStore from './js/store';
import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './js/reducers'

import {
	App,
	Home,
    Goods
} from './pages';

import './styles/base.less';
import 'babel-polyfill';


const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
	            <IndexRoute component={Goods} />
                <Route path="goods" component={Goods} />
	            <Route path="home" component={Home} />
            </Route>
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

