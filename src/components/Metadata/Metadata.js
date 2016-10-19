import React, {Component, PropTypes} from 'react';

export default class Metadata extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    const styles = require('./Metadata.scss');
    const { title } = this.props;

    return (
      <div className={styles.metadata}>
        <h1 className={styles.title}>{title}</h1>
        <ul>
          <li>yawn</li>
          <li>another waterfall</li>
        </ul>
      </div>
    );
  }
}
