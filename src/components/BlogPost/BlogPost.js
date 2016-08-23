import React, {Component, PropTypes} from 'react';

export default class BlogPost extends Component {
  static propTypes = {
    content: PropTypes.string
  }
  render() {
    return (
      <div>{this.props.content}</div>
    );
  }
}
