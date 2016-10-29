import React, { Component, PropTypes } from 'react';

export default class Property extends Component {
  static propTypes = {
    property: PropTypes.string,
    value: PropTypes.string,
    key: PropTypes.key,
  }

  render() {
    const styles = require('./Property.scss');
    const { property, value, key } = this.props;

    return (
      <div key={key}>
        <span className={styles.property}>{property} </span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
}
