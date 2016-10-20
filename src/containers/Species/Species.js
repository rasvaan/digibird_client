import React, { Component, PropTypes } from 'react';
import { Media } from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadNsr } from '../../redux/modules/nsr';
import Helmet from 'react-helmet';


@connect(
  state => ({
    nsrResults: state.nsr.results,
    nsrLoading: state.nsr.loading,
    nsrLoaded: state.nsr.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadNsr());
  }
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
