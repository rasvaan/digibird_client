import React, {Component, PropTypes} from 'react';

export default class Sound extends Component {
  static propTypes = {
    url: PropTypes.string
  }

  render() {
    const styles = require('./Sound.scss');
    const { url } = this.props;

    return (
      <div className={styles.wrapper}>
        <audio controls className={`${styles.sound}`}>
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}
