import React, { Component, PropTypes } from 'react';

export default class Annotation extends Component {
  static propTypes = {
    body: PropTypes.string,
    uri: PropTypes.string,
  }

  render() {
    const styles = require('./Annotation.scss');
    const { body, uri } = this.props;

    return (
      <span className={`label label-default ${styles.annotation}`} key={uri}>
        {body}
      </span>
    );
  }
}
