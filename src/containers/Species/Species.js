import React, { Component, PropTypes } from 'react';
import { Media } from 'components';
import Typeahead from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { loadObjects } from '../../redux/modules/objects';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Banner } from 'components';

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
    // read parameter from url, show results on load
    const { query } = this.props;

    // only search when parameters are provided
    if (!(Object.keys(query).length === 0 && query.constructor === Object)) {
      this.searchSystems(query);
    }
  }
  search(query) {
    // search for a common name
    const queryObject = { 'common_name': query };
    this.searchSystems(queryObject);
  }
  searchSystems(queryObject) {
    // fire search query for every available system
    this.props.loadObjects('soortenregister', queryObject);
    this.props.loadObjects('xeno-canto', queryObject);
    this.props.loadObjects('rijksmuseum', queryObject);
    this.props.loadObjects('natuurbeelden', queryObject);
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
    const uri = result['edm:aggregatedCHO']['@id'];
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
      const metadata = this.natuurBeeldenMetadata(result);
      const title = result['edm:aggregatedCHO']['dc:title'] || result['edm:aggregatedCHO']['@id'];

      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={title}
          metadata={metadata}
          color="color3"
        />
      );
    });
  }
  natuurBeeldenMetadata(result) {
    const meta = [];
    const uri = result['edm:aggregatedCHO']['@id'];
    const creator = result['edm:aggregatedCHO']['dc:creator'];
    const description = result['edm:aggregatedCHO']['dc:description'];
    const rights = result['dcterms:rights'];

    if (creator) meta.push(this.metaObject(uri, 'creator', creator, 'text'));
    if (description) meta.push(this.metaObject(uri, 'description', description, 'text'));
    if (rights) meta.push(this.metaObject(uri, 'rights', rights, 'text'));
    meta.push(this.metaObject(uri, 'source', 'Stichting Natuurbeelden', 'text'));

    return meta;
  }
  rijksmuseumNodes(rmaResults) {
    return rmaResults['@graph'].map((result) => {
      const metadata = this.rijksmuseumMetadata(result);
      const title = result['edm:aggregatedCHO']['dc:title'] || result['edm:aggregatedCHO']['@id'];

      return (
        <Media
          key={result['edm:aggregatedCHO']['@id']}
          url={result['edm:isShownBy']['@id']}
          type={result['edm:isShownBy']['dcterms:type']}
          title={title}
          metadata={metadata}
          color="color4"
        />
      );
    });
  }
  rijksmuseumMetadata(result) {
    const meta = [];
    const uri = result['edm:aggregatedCHO']['@id'];
    const creator = result['edm:aggregatedCHO']['dc:creator'];
    const description = result['edm:aggregatedCHO']['dc:description'];
    const rights = result['dcterms:rights'];

    if (creator) meta.push(this.metaObject(uri, 'creator', creator, 'text'));
    if (description) meta.push(this.metaObject(uri, 'description', description, 'text'));
    if (rights) meta.push(this.metaObject(uri, 'rights', rights, 'text'));
    meta.push(this.metaObject(uri, 'source', 'Rijksmuseum Amsterdam', 'text'));

    return meta;
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
  handleInput(inputArray) {
    // search for input
    if (inputArray && inputArray.length > 0) {
      browserHistory.push(`/species?common_name=${inputArray[0]}`);
      this.search(inputArray[0]);
    }
  }
  render() {
    const styles = require('./Species.scss');
    const alternatives = require('./species_en.json');
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

    if (nodes.length === 0 && !(nsrLoaded || xcLoaded || nbLoaded || rmaLoaded)) {
      nodes = <Banner title="Search for birds" image="search" />;
    }

    if (nodes.length === 0 && nsrLoaded && xcLoaded && nbLoaded && rmaLoaded) {
      nodes = <Banner title="Nothing found" image="error" />;
    }

    if (nodes.length > 0) {
      nodes = this.mix(nodes);
    }

    return (
      <div>
        <Helmet title="Species"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          <div className={`row ${styles.search}`}>
            <Typeahead className={styles.typeAhead}
              onChange={this.handleInput.bind(this)}
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
