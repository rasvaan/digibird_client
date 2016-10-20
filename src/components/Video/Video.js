import React, {Component, PropTypes} from 'react';

export default class Video extends Component {
  static propTypes = {
    url: PropTypes.string
  }

  render() {
    const { url } = this.props;

    return (
      <video width="400" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  }
}
