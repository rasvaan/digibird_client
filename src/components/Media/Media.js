import React, {Component, PropTypes} from 'react';
import { Image, Metadata } from 'components';

export default class Media extends Component {
  static propTypes = {
    color: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string
  }
  mediaComponent(type, url) {
    switch (type) {
      case 'dctype:Image': {
        return <Image url={url} />;
      }
      case 'dctype:Sound': {
        return <Image url={url} />;
      }
      case 'dctype:MovingImage': {
        return <Image url={url} />;
      }
      default: {
        return <Image url={url} />;
      }
    }
  }
  render() {
    const styles = require('./Media.scss');
    const { color, url, type, title } = this.props;
    const media = this.mediaComponent(type, url);

    return (
      <div className={`row ${styles[color]}`}>
        <div className="col-md-8">
          {media}
        </div>
        <div className="col-md-4">
          <Metadata title={title} />
        </div>
      </div>
    );
  }
}
