import React from 'react'
import Html from './html.jsx';
import {renderToStaticMarkup} from 'react-dom-stream/server'
import {match} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import makeReducer from '../src/reducers/index';
import {Map} from 'immutable';
import thunkMiddleware from 'redux-thunk';
import routes from '../src/routes';
import {UPDATE_LOCATION} from 'redux-simple-router';

module.exports = function (req, res) {

  const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
  const store = finalCreateStore(makeReducer(), Map());

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const location = renderProps ? renderProps.location : '/';
      store.dispatch({type: UPDATE_LOCATION, location});
      var htmlStream = renderToStaticMarkup(<Html store={store} renderProps={renderProps} />);
      htmlStream.pipe(res, {end: false});
      htmlStream.on('end', function () {
        res.end();
      });
    } else {
      res.status(404).send('Not found');
    }
  });


}
