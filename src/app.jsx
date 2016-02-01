import React from 'react'
import {Provider} from 'react-redux'
import configureStore from './store/dev.js'
import {Route, Router, IndexRoute, browserHistory} from 'react-router'
import Routes from './routes.jsx'
import {render} from 'react-dom';
import Root from './root.jsx';

const store = configureStore();

render(<Root store={store}/>, document.getElementById('app'));
