import React, {Component, PropTypes} from 'react';

export default class Video extends Component {
  static propTypes = {
    url: PropTypes.string,
    thumbnail: PropTypes.string
  }

  render() {
    const styles = require('./Video.scss');
    const { url, thumbnail } = this.props;

    return (
      <video
        controls
        preload="metadata"
        className={`${styles.video} embed-responsive`}
        poster={thumbnail}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  }
}
