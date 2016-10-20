import React, { Component, PropTypes } from 'react';
import { Media } from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadObjects } from '../../redux/modules/objects';
import Helmet from 'react-helmet';


@connect(
  state => ({
    nsrResults: state.objects.soortenregister.results,
    nsrLoading: state.objects.soortenregister.loading,
    nsrLoaded: state.objects.soortenregister.loaded,
    xcResults: state.objects['xeno-canto'].results,
    xcLoading: state.objects['xeno-canto'].loading,
    xcLoaded: state.objects['xeno-canto'].loaded,
    rmaResults: state.objects.rijksmuseum.results,
    rmaLoading: state.objects.rijksmuseum.loading,
    rmaLoaded: state.objects.rijksmuseum.loaded,
    query: state.routing.locationBeforeTransitions.query
  }),
  {loadObjects}
)
@asyncConnect([
  {
    promise: ({store: {dispatch, getState}}) => {
      const query = getState().routing.locationBeforeTransitions.query;
      return dispatch(loadObjects('soortenregister', query));
    },
  },
  // {
  //   promise: ({store: {dispatch, getState}}) => {
  //     const query = getState().routing.locationBeforeTransitions.query;
  //     return dispatch(loadObjects('xeno-canto', query));
  //   },
  // },
])
export default class Species extends Component {
  static propTypes = {
    nsrResults: PropTypes.object,
    nsrLoaded: PropTypes.bool,
    nsrLoading: PropTypes.bool,
    xcResults: PropTypes.object,
    xcLoaded: PropTypes.bool,
    xcLoading: PropTypes.bool,
    rmaResults: PropTypes.object,
    rmaLoaded: PropTypes.bool,
    rmaLoading: PropTypes.bool,
    query: PropTypes.object,
    loadObjects: PropTypes.func
  }
  componentWillMount() {
    // const { query } = this.props;
    // this.props.loadObjects('rijksmuseum', query);
  }
  soortenRegisterNodes(nsrResults) {
    return nsrResults['@graph'].map((result) => {
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
  xenoCantoNodes(xcResults) {
    return xcResults['@graph'].map((result) => {
      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={result['edm:aggregatedCHO']['@id']}
          color="color2"
        />
      );
    });
  }
  rijksmuseumNodes(rmaResults) {
    return rmaResults['@graph'].map((result) => {
      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={result['edm:aggregatedCHO']['@id']}
          color="color3"
        />
      );
    });
  }
  render() {
    const styles = require('./Species.scss');
    const { nsrResults, nsrLoaded, xcResults, xcLoaded, rmaResults, rmaLoaded } = this.props;
    let nsrNodes;
    let xcNodes;
    let rmaNodes;

    if (nsrLoaded) nsrNodes = this.soortenRegisterNodes(nsrResults);
    if (xcLoaded) xcNodes = this.xenoCantoNodes(xcResults);
    if (rmaLoaded) rmaNodes = this.rijksmuseumNodes(rmaResults);

    return (
      <div>
        <Helmet title="Species"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          {nsrNodes}
          {xcNodes}
          {rmaNodes}
        </div>
      </div>
    );
  }
}
