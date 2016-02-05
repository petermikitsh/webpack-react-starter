import React from 'react'
import configureStore from './store/dev.js'
import {render} from 'react-dom';
import Root from './root.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

require('normalize.css');
require('./styles.scss');

injectTapEventPlugin();
render(<Root store={configureStore()}/>, document.getElementById('app'));
