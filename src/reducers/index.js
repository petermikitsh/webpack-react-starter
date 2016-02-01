import {combineReducers} from 'redux';
import {routeReducer as routing} from 'redux-simple-router';
import {compose} from 'redux';

let currentReducers = {
  routing
};

export default (newReducers, reducerEnhancers) => {
  Object.assign(currentReducers, newReducers);
  const reducer = combineReducers({...currentReducers})
  if (reducerEnhancers){
    return Array.isArray(reducerEnhancers) ? compose(...reducerEnhancers)(reducer) : reducerEnhancers(reducer);
  }
  return reducer;
}
