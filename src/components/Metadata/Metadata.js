import React, {Component, PropTypes} from 'react';
import { Annotation } from 'components';

export default class Metadata extends Component {
  static propTypes = {
    title: PropTypes.string,
    annotations: PropTypes.array,
  }
  createAnnotationNodes(annotations) {
    const nodes = [];

    annotations.forEach(annotation => {
      nodes.push(
        <Annotation
          key={annotation['@id']}
          body={annotation['oa:hasBody']}
        />
      );
    });

    return nodes;
  }
  render() {
    const styles = require('./Metadata.scss');
    const { title, annotations } = this.props;
    let annotationNodes;

    if (annotations && annotations.length > 0) {
      annotationNodes = this.createAnnotationNodes(annotations);
    }
    return (
      <div className={styles.metadata}>
        <h1>{title}</h1>
        { annotationNodes }
      </div>
    );
  }
}
