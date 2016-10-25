import React, { Component, PropTypes } from 'react';
import { Media } from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadAnnotations } from '../../redux/modules/annotations';
import Helmet from 'react-helmet';


@connect(
  state => ({
    accuratorResults: state.annotations.accurator.results,
    accuratorLoading: state.annotations.accurator.loading,
    accuratorLoaded: state.annotations.accurator.loaded,
  }),
  {}
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(loadAnnotations('accurator'));
    },
  },
])
export default class Species extends Component {
  static propTypes = {
    accuratorResults: PropTypes.array,
    accuratorLoading: PropTypes.bool,
    accuratorLoaded: PropTypes.bool
  }
  accuratorNodes(accuratorResults) {
    return accuratorResults.map((result) => {
      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={result['edm:aggregatedCHO']['@id']}
          color="color1"
        />
      );
    });
  }
  render() {
    const styles = require('./Annotations.scss');
    const { accuratorResults, accuratorLoaded } = this.props;
    let accuratorNodes;

    if (accuratorLoaded) accuratorNodes = this.accuratorNodes(accuratorResults);
    console.log(accuratorLoaded, accuratorResults);
    return (
      <div>
        <Helmet title="Annotations"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          {accuratorNodes}
        </div>
      </div>
    );
  }
}
