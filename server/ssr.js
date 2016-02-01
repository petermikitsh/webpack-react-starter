import React from 'react'
import Html from './html.jsx';
import {renderToStaticMarkup} from 'react-dom-stream/server'

module.exports = function (req, res) {
  var htmlStream = renderToStaticMarkup(<Html />);
  htmlStream.pipe(res, {end: false});
  htmlStream.on('end', function () {
    res.end()
  });
}
