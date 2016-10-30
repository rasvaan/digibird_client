import React, { Component, PropTypes } from 'react';
import { Media } from 'components';
import Typeahead from 'react-bootstrap-typeahead';
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
      const metadata = this.soortenRegisterMetadata(result);

      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={result['edm:aggregatedCHO']['dc:title']}
          metadata={metadata}
          color="color1"
        />
      );
    });
  }
  soortenRegisterMetadata(result) {
    const meta = [];
    const uri = result['edm:aggregatedCHO']['@id'];
    const creator = result['edm:aggregatedCHO']['dc:creator'];
    const country = result['edm:aggregatedCHO']['dcterms:spatial'];
    const date = result['edm:aggregatedCHO']['dcterms:temporal'];
    const rights = result['dcterms:rights'];

    if (creator) meta.push(this.metaObject(uri, 'creator', creator, 'text'));
    if (country) meta.push(this.metaObject(uri, 'place', country, 'text'));
    if (date) meta.push(this.metaObject(uri, 'date', date, 'text'));
    if (rights) meta.push(this.metaObject(uri, 'copyright', rights, 'text'));
    meta.push(this.metaObject(uri, 'source', 'Nederlands Soorten Register', 'text'));

    return meta;
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
    const meta = [];
    const uri = `${result['edm:aggregatedCHO']['@id']}`;
    const creator = result['edm:aggregatedCHO']['dc:creator'];
    const country = result['edm:aggregatedCHO']['dcterms:spatial'];
    const date = result['edm:aggregatedCHO']['dcterms:temporal'];
    const rights = result['dcterms:rights'];

    if (creator) meta.push(this.metaObject(uri, 'creator', creator, 'text'));
    if (country) meta.push(this.metaObject(uri, 'country', country, 'text'));
    if (date) meta.push(this.metaObject(uri, 'date', date, 'text'));
    if (rights) meta.push(this.metaObject(uri, 'rights', rights, 'text'));
    meta.push(this.metaObject(uri, 'source', 'Xeno-canto', 'text'));

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
  metaObject(uri, property, value, type) {
    return {
      'key': `${uri}/${property}/${value}`,
      'property': property,
      'value': value,
      'type': type,
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
    let alternatives;
    let xenoCantoNodes;
    let nodes = [];

    // order of these lines is the order of sorting
    if (nsrLoaded) nodes.push(this.soortenRegisterNodes(nsrResults));
    if (nbLoaded) nodes.push(this.natuurBeeldenNodes(nbResults));
    if (rmaLoaded) nodes.push(this.rijksmuseumNodes(rmaResults));
    if (xcLoaded) xenoCantoNodes = this.xenoCantoNodes(xcResults);

    nodes = this.mix(nodes);
    alternatives = ['a', 'c'];

    return (
      <div>
        <Helmet title="Species"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          <div className={`row ${styles.search}`}>
            <Typeahead className={styles.typeAhead}
              options={alternatives}
            />
          </div>
          {nodes}
          {xenoCantoNodes}
        </div>
      </div>
    );
  }
}
