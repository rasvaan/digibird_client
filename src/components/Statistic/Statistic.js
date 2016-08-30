import React, { Component } from 'react';

export default class Statistic extends Component {

  render() {
    return (
      <h4 className="statistic">
        {'value'}
        <span> </span>
        {'type'}
      </h4>
    );
  }
}
