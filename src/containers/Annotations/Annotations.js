import React, { Component, PropTypes } from 'react';
import { Media } from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadAnnotations, updateAnnotations } from '../../redux/modules/annotations';
import Helmet from 'react-helmet';


@connect(
  state => ({
    accuratorResults: state.annotations.accurator.results,
    accuratorLoading: state.annotations.accurator.loading,
    accuratorLoaded: state.annotations.accurator.loaded,
    accuratorLoadingAt: state.annotations.accurator.loadingAt,
  }),
  {updateAnnotations}
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(loadAnnotations('accurator'));
    },
  },
])
export default class Annotations extends Component {
  static propTypes = {
    accuratorResults: PropTypes.array,
    accuratorLoading: PropTypes.bool,
    accuratorLoaded: PropTypes.bool,
    accuratorLoadingAt: PropTypes.string,
    updateAnnotations: PropTypes.func
  }
  componentWillMount() {
    // set update interval
    this.intervalId = setInterval(this.updateAccurator.bind(this), 5000);
  }
  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.intervalId);
  }
  updateAccurator() {
    // get date last poll
    const { accuratorLoadingAt } = this.props;
    this.props.updateAnnotations('accurator', accuratorLoadingAt);
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
