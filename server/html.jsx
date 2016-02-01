import React, {Component} from 'react';
import Index from '../src/components/index.jsx'
import {renderToStaticMarkup} from 'react-dom-stream/server'
import config from './config/config'

export default class Html extends Component {

  render() {
    return (
      <html>
        <head>
          <title>App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/ >
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: renderToStaticMarkup(<Index />)}}></div>
          <script src={config.useBuildAssets ? '/bundle.js' : 'https://localhost:9090/build/bundle.js'}/>
        </body>
      </html>
    );
  }

}
