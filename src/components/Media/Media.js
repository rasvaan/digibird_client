import React, {Component, PropTypes} from 'react';
import { Image, Metadata } from 'components';

export default class Media extends Component {
  static propTypes = {
    color: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string
  }

  render() {
    const styles = require('./Media.scss');
    const { color, url, title } = this.props;

    return (
      <div className={`row ${styles[color]}`}>
        <div className="col-md-8">
          <Image url={url} />
        </div>
        <div className="col-md-4">
          <Metadata title={title} />
        </div>
      </div>
    );
  }
}
