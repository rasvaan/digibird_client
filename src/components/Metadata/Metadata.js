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
        <h1>{title}</h1>
      </div>
    );
  }
}
