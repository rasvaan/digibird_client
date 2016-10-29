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
    nbResults: state.objects.natuurbeelden.results,
    nbLoading: state.objects.natuurbeelden.loading,
    nbLoaded: state.objects.natuurbeelden.loaded,
    rmaResults: state.objects.rijksmuseum.results,
    rmaLoading: state.objects.rijksmuseum.loading,
    rmaLoaded: state.objects.rijksmuseum.loaded,
    query: state.routing.locationBeforeTransitions.query
  }),
  {
    loadObjects
  }
)
@asyncConnect([
  {
    promise: ({store: {dispatch, getState}}) => {
      const query = getState().routing.locationBeforeTransitions.query;
      return dispatch(loadObjects('soortenregister', query));
    },
  },
  {
    promise: ({store: {dispatch, getState}}) => {
      const query = getState().routing.locationBeforeTransitions.query;
      return dispatch(loadObjects('xeno-canto', query));
    },
  },
  {
    promise: ({store: {dispatch, getState}}) => {
      const query = getState().routing.locationBeforeTransitions.query;
      return dispatch(loadObjects('natuurbeelden', query));
    },
  }
])
export default class Species extends Component {
  static propTypes = {
    nsrResults: PropTypes.object,
    nsrLoaded: PropTypes.bool,
    nsrLoading: PropTypes.bool,
    xcResults: PropTypes.object,
    xcLoaded: PropTypes.bool,
    xcLoading: PropTypes.bool,
    nbResults: PropTypes.object,
    nbLoading: PropTypes.bool,
    nbLoaded: PropTypes.bool,
    rmaResults: PropTypes.object,
    rmaLoaded: PropTypes.bool,
    rmaLoading: PropTypes.bool,
    query: PropTypes.object,
    loadObjects: PropTypes.func
  }
  componentWillMount() {
    const { query } = this.props;
    this.props.loadObjects('rijksmuseum', query);
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
      const title = this.capitalizeFirstLetter(
        result['edm:aggregatedCHO']['dc:type']
      );
      const metadata = this.xenoCantoMetadata(result);

      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={title}
          metadata={metadata}
          color="color2"
        />
      );
    });
  }
  xenoCantoMetadata(result) {
    // console.log(result);
    const meta = [];
    const uri = `${result['edm:aggregatedCHO']['@id']}`;
    const creator = result['edm:aggregatedCHO']['dc:creator'];

    if (creator) meta.push(this.metaObject(uri, 'recordist', creator));

    return meta;
  }
  natuurBeeldenNodes(nbResults) {
    return nbResults['@graph'].map((result) => {
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
  metaObject(uri, property, value) {
    return {
      'key': `${uri}/${property}/${value}`,
      'property': property,
      'value': value,
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  mix(arrays) {
    const mix = [];
    let somethingLeft = true;

    while (somethingLeft) {
      // get first array
      const array = arrays.shift();
      // push first element in the mix
      mix.push(array.shift());
      // if array is not empty, move to back of arrays
      if (array.length > 0) arrays.push(array);
      // stop if nothing left to add
      if (arrays.length === 0) somethingLeft = false;
    }

    return mix;
  }
  render() {
    const styles = require('./Species.scss');
    const { nsrResults, nsrLoaded } = this.props;
    const { xcResults, xcLoaded } = this.props;
    const { nbResults, nbLoaded } = this.props;
    const { rmaResults, rmaLoaded } = this.props;
    let xenoCantoNodes;
    let nodes = [];

    // order of these lines is the order of sorting
    if (nsrLoaded) nodes.push(this.soortenRegisterNodes(nsrResults));
    if (nbLoaded) nodes.push(this.natuurBeeldenNodes(nbResults));
    if (rmaLoaded) nodes.push(this.rijksmuseumNodes(rmaResults));
    if (xcLoaded) xenoCantoNodes = this.xenoCantoNodes(xcResults);

    nodes = this.mix(nodes);

    return (
      <div>
        <Helmet title="Species"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          {xenoCantoNodes}
          {nodes}
        </div>
      </div>
    );
  }
}
