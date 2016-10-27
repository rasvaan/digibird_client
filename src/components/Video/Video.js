import React, {Component, PropTypes} from 'react';

export default class Video extends Component {
  static propTypes = {
    url: PropTypes.string
  }

  render() {
    const styles = require('./Video.scss');
    const { url } = this.props;

    return (
      <video
        className={`${styles.video} embed-responsive`}
        controls
      >
        <source src={url} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  }
}
