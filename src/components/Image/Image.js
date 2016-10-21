import React, {Component, PropTypes} from 'react';

export default class Image extends Component {
  static propTypes = {
    url: PropTypes.string
  }

  render() {
    const styles = require('./Image.scss');

    return (
      <img src={this.props.url} className={`img-responsive ${styles.image}`}></img>
    );
  }
}
