import React, {Component, PropTypes} from 'react';
import {renderToStaticMarkup} from 'react-dom-stream/server'
import config from './config/config'
import {renderToString} from 'react-dom-stream/server';
import {Provider} from 'react-redux';
import {RouterContext} from 'react-router';

export default class Html extends Component {

  static propTypes: {
    store: PropTypes.object.isRequired,
    renderProps: PropTypes.object
  };

  render() {

    const {store, renderProps} = this.props;

    const app = renderToString(
      <div>
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      </div>
    );

    return (
      <html>
        <head>
          <title>App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/ >
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: app}}></div>
          <script src={config.useBuildAssets ? '/bundle.js' : 'https://localhost:9090/build/bundle.js'}/>
        </body>
      </html>
    );
  }

}
