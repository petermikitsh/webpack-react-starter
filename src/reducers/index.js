import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import {compose} from 'redux';
import {socketClusterReducer} from 'redux-socket-cluster';
import home from './home';

let currentReducers = {
  home,
  routing: routeReducer,
  socket: socketClusterReducer
};

export default (newReducers, reducerEnhancers) => {
  Object.assign(currentReducers, newReducers);
  const reducer = combineReducers({...currentReducers})
  if (reducerEnhancers){
    return Array.isArray(reducerEnhancers) ? compose(...reducerEnhancers)(reducer) : reducerEnhancers(reducer);
  }
  return reducer;
}
