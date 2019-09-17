import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import './index.css';
import 'normalize.css';

import SignInScreen from './containers/SignInScreen';
import SignUpScreen from './containers/SignUpScreen';
import ProfileScreen from './containers/ProfileScreen';
import AddPostScreen from './containers/AddPostScreen';
import PostsScreen from './containers/PostsScreen';
import SearchScreen from './containers/SearchScreen';

import * as reducers from './store/reducers';

const store = createStore(combineReducers({...reducers, routing: routerReducer}), applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={SignInScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/signup" component={SignUpScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/addpost" component={AddPostScreen} />
            <Route path="/posts" component={PostsScreen} />
            <Route path="/search" component={SearchScreen} />
        </Router>
    </Provider>,
    document.getElementById('root')
);