import React, {Component} from 'react'
import { Link } from 'react-router'

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Hello World! Index</h1>
        <Link to='/foo'>Back to Foo</Link>
      </div>
    );
  }
}

export default Index
