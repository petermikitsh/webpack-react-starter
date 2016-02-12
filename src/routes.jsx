import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router'
import App from './components/app.jsx'
import Foo from './components/foo.jsx'
import Index from './components/index.jsx'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Index} />
    <Route path="foo" component={Foo} />
  </Route>
)
