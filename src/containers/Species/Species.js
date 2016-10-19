import React, { Component } from 'react';
import { Media } from 'components';
import Helmet from 'react-helmet';

export default class Species extends Component {
  render() {
    const styles = require('./Species.scss');

    return (
      <div>
        <Helmet title="Species"/>
        <div className="container">
          <p className={styles.fancy}>Very fancy species page</p>
          <Media color="orange"/>
          <Media color="red"/>
        </div>
      </div>
    );
  }
}
