import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {syncHistory, routeReducer} from 'redux-simple-router'
import {browserHistory} from 'react-router'
import makeReducer from '../reducers/index'
import DevTools from '../DevTools.jsx'

export default function configureStore(initialState) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  if (__DEVTOOLS__) {
    var createStoreWithMiddleware = compose(
      applyMiddleware(reduxRouterMiddleware, thunkMiddleware),
      DevTools.instrument()
    )(createStore);
  } else {
    var createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore);
  }
  return createStoreWithMiddleware(makeReducer(), initialState);
}
