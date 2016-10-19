import React, { Component } from 'react';
import { Footer } from 'components';
import Helmet from 'react-helmet';

export default class Species extends Component {
  render() {
    const styles = require('./Species.scss');

    return (
      <div>
        <Helmet title="Species"/>
        <p className={styles.fancy}>Very fancy species page</p>
        <Footer />
      </div>
    );
  }
}
