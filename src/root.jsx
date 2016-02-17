import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes.jsx';
import DevTools from './DevTools.jsx'

var request = require('superagent');

export default class Root extends Component {

  componentWillMount() {
    localStorage.setItem('MyApp.token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTU2OTU0ODF9.oM-F4q02TNELoDBwLGGwRMVl_j-nV1c8TZMnG4-CLaY')
  }

  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={routes}/>
          { __DEVTOOLS__ ? <DevTools /> : null }
        </div>
      </Provider>
    );
  }
}
