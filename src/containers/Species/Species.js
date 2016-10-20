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
    nsrLoaded: state.objects.soortenregister.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadObjects('soortenregister'));
  },
}, {
  promise: ({store: {dispatch}}) => {
    return dispatch(loadObjects('xeno-canto'));
  },
}, {
  promise: ({store: {dispatch}}) => {
    return dispatch(loadObjects('rijksmuseum'));
  },
}])
export default class Species extends Component {
  static propTypes = {
    nsrResults: PropTypes.object,
    nsrLoaded: PropTypes.bool,
    nsrLoading: PropTypes.bool
  }
  render() {
    const styles = require('./Species.scss');
    const { nsrResults, nsrLoaded } = this.props;
    let nsrNodes;

    if (nsrLoaded) {
      const object = nsrResults['@graph'][0]['edm:aggregatedCHO'];
      const resource = nsrResults['@graph'][0]['edm:isShownBy'];

      nsrNodes = (
        <Media
          url={resource['@id']}
          type={resource['dcterms:type']}
          title={object['@id']}
          color="red"
        />
      );
    }

    return (
      <div>
        <Helmet title="Species"/>
        <div className="container">
          <p className={styles.fancy}>Very fancy species page</p>
          {nsrNodes}
        </div>
      </div>
    );
  }
}
