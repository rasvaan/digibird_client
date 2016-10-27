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
    waisdaResults: state.annotations.waisda.results,
    waisdaLoading: state.annotations.waisda.loading,
    waisdaLoaded: state.annotations.waisda.loaded,
    waisdaLoadingAt: state.annotations.waisda.loadingAt,
  }),
  {updateAnnotations}
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(loadAnnotations('accurator'));
    },
  },
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(loadAnnotations('waisda'));
    },
  },
])
export default class Annotations extends Component {
  static propTypes = {
    accuratorResults: PropTypes.array,
    accuratorLoading: PropTypes.bool,
    accuratorLoaded: PropTypes.bool,
    accuratorLoadingAt: PropTypes.string,
    waisdaResults: PropTypes.array,
    waisdaLoading: PropTypes.bool,
    waisdaLoaded: PropTypes.bool,
    waisdaLoadingAt: PropTypes.string,
    updateAnnotations: PropTypes.func
  }
  componentWillMount() {
    // set update interval
    this.intervalId = setInterval(this.updateAccurator.bind(this), 5000000);
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
  createNodes(results) {
    return results.map((result) => {
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
  sortAnnotations(aggregations) {
    // sort annotation lists
    aggregations.forEach(aggregation => {
      if (aggregation['edm:aggregatedCHO'].annotations) {
        aggregation['edm:aggregatedCHO'].annotations.sort((one, two) => {
          if (one['oa:annotatedAt'] < two['oa:annotatedAt']) return 1;
          if (one['oa:annotatedAt'] > two['oa:annotatedAt']) return -1;
          return 0; // one must be equal to two
        });
      }
    });
    return aggregations;
  }
  sortResults(aggregations) {
    console.log('FIRST RESUKT', aggregations[0]);
    // sort aggregations based on first entry annotation list
    return aggregations.sort((one, two) => {
      const dateOne = one['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];
      const dateTwo = two['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];

      if (dateOne < dateTwo) return 1;
      if (dateOne > dateTwo) return -1;
      return 0; // dateOne must be equal to dateTwo
    });
  }
  render() {
    const styles = require('./Annotations.scss');
    const { accuratorResults, accuratorLoaded, waisdaResults, waisdaLoaded } = this.props;
    let results = [];
    let nodes;

    if (accuratorLoaded) results = results.concat(accuratorResults);
    if (waisdaLoaded) results = results.concat(waisdaResults);

    results = this.sortAnnotations(results);
    results = this.sortResults(results);
    nodes = this.createNodes(results);

    return (
      <div>
        <Helmet title="Annotations"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          {nodes}
        </div>
      </div>
    );
  }
}
