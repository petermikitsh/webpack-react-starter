import React, {Component} from 'react'
import { Link } from 'react-router'

class Foo extends Component {
  render() {
    return (
      <div>
        <h1>Hello World! Foo</h1>
        <Link to='/'>Back to Index</Link>
      </div>
    );
  }
}

export default Foo
