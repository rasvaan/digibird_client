import React, {Component, PropTypes} from 'react';

export default class Sound extends Component {
  static propTypes = {
    url: PropTypes.string
  }

  render() {
    const { url } = this.props;

    return (
      <audio controls>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  }
}
