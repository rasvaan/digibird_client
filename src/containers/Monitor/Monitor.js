import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Monitor extends Component {
  render() {
    // const styles = require('./Monitor.scss');

    return (
      <div>
        <Helmet title="Monitor"/>
        <div className="container">Dze uber monitor</div>
      </div>
    );
  }
}
