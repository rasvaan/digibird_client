import React, {Component, PropTypes} from 'react';
import { Sound, Image, Video, Metadata } from 'components';

export default class Media extends Component {
  static propTypes = {
    color: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    annotations: PropTypes.array,
  }
  mediaComponent(type, url) {
    switch (type) {
      case 'dctype:Image': {
        return <Image url={url} />;
      }
      case 'dctype:Sound': {
        return <Sound url={url} />;
      }
      case 'dctype:MovingImage': {
        return <Video url={url} />;
      }
      default: {
        return <p>unknown media type</p>;
      }
    }
  }
  render() {
    const styles = require('./Media.scss');
    const { color, url, type, title, annotations } = this.props;
    const media = this.mediaComponent(type, url);

    return (
      <div className={`row ${styles[color]}  ${styles.noGutter}`}>
        <div className={`col-md-8 ${styles.noPadding}`}>
          {media}
        </div>
        <div className="col-md-4">
          <Metadata title={title} annotations={annotations} />
        </div>
      </div>
    );
  }
}
