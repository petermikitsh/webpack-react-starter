import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import React, {Component} from 'react'
import {reduxSocket} from 'redux-socket-cluster';

@reduxSocket({authTokenName: 'MyApp.token'}, {keepAlive: 60000})
class App extends Component {

  render () {
    return (
      <div>
        <AppBar
          title='webpack-react-start'
          iconElementLeft={<IconButton></IconButton>} />
        { this.props.children }
      </div>
    );
  }

}

export default App
