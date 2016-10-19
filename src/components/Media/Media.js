import React, {Component, PropTypes} from 'react';
import { Image, Metadata } from 'components';

export default class Media extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  render() {
    const styles = require('./Media.scss');

    return (
      <div className={`row ${styles[this.props.color]}`}>
        <div className="col-md-8">
          <Image url="https://upload.wikimedia.org/wikipedia/commons/c/c5/Selfoss_July_2014.JPG"/>
        </div>
        <div className="col-md-4">
          <Metadata title="Interesting stuff" />
        </div>
      </div>
    );
  }
}
