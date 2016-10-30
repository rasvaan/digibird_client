import React, {Component, PropTypes} from 'react';

export default class Sound extends Component {
  static propTypes = {
    url: PropTypes.string
  }

  render() {
    const styles = require('./Sound.scss');
    const { url } = this.props;

    return (
      <audio controls preload="metadata" className={styles.sound}>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  }
}
