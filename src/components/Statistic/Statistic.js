import React, { Component, PropTypes } from 'react';

export default class Statistic extends Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string
  }

  render() {
    const { type, value } = this.props;

    return (
      <h4 className="statistic">
        {type}
        <span> </span>
        {value}
      </h4>
    );
  }
}
