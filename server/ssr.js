import React from 'react'
import Html from './html.jsx'
import * as ReactDomServer from 'react-dom/server'
import {match} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import makeReducer from '../src/reducers/index'
import thunkMiddleware from 'redux-thunk'
import routes from '../src/routes.jsx'
import {UPDATE_LOCATION} from 'redux-simple-router'
import config from './config'

module.exports = function (req, res) {

  const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
  const store = finalCreateStore(makeReducer());

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const location = renderProps ? renderProps.location : '/';
      store.dispatch({type: UPDATE_LOCATION, location});
      if (config.env === 'production') {
        var html = ReactDomServer
          .renderToStaticMarkup(<Html store={store} renderProps={renderProps} />)
          .replace('<html>', '<!DOCTYPE html>');
        res.end(html);
      } else {
        store.dispatch({type: UPDATE_LOCATION, location: '/'});
        res.end(ReactDomServer.renderToStaticMarkup(<Html store={store} />));
      }
    } else {
      res.status(404).send('Not found');
    }
  });


}
