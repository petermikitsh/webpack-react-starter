import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as HomeActions from '../actions/home'

class Home extends Component {

  componentWillMount() {
    this.props.homeInit();
  }

  render() {
    return (
      <div>
        <h1>Hello World! Home</h1>
        <Link to='/foo'>Back to Foo</Link>
        <h2>Random value: {this.props.home}</h2>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { home: state.home };
}

export default connect(mapStateToProps, HomeActions)(Home)