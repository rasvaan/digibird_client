import React, {Component, PropTypes} from 'react';
import { Property, Annotation } from 'components';

export default class Metadata extends Component {
  static propTypes = {
    title: PropTypes.string,
    metadata: PropTypes.array,
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
  createMetadataNodes(metadata) {
    const nodes = [];

    metadata.forEach(property => {
      nodes.push(
        <Property
          key={property.key}
          property={property.property}
          value={property.value}
        />
      );
    });

    return nodes;
  }
  render() {
    const styles = require('./Metadata.scss');
    console.log(this.props);
    const { title, metadata, annotations } = this.props;
    console.log(metadata);
    let metadataNodes;
    let annotationNodes;

    if (annotations && annotations.length > 0) {
      annotationNodes = this.createAnnotationNodes(annotations);
    }

    if (metadata && metadata.length > 0) {
      metadataNodes = this.createMetadataNodes(metadata);
    }

    return (
      <div className={styles.metadata}>
        <h1>{title}</h1>
        { metadataNodes }
        { annotationNodes }
      </div>
    );
  }
}
