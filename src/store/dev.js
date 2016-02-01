import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {syncHistory, routeReducer} from 'redux-simple-router'
import {browserHistory} from 'react-router'
import makeReducer from '../reducers/index'
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

var DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <LogMonitor />
  </DockMonitor>
);

export default function configureStore(initialState) {
  const reduxRouterMiddleware = syncHistory(browserHistory)
  const createStoreWithMiddleware = compose(
    applyMiddleware(reduxRouterMiddleware, thunkMiddleware),
    DevTools.instrument()
  )(createStore);
  const store = createStoreWithMiddleware(makeReducer(), initialState);
  // reduxRouterMiddleware.listenForReplays(store, state => state.get('routing'));
  return store;
}
