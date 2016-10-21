import React, { Component, PropTypes } from 'react';
// import { Media } from 'components';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadAnnotations } from '../../redux/modules/annotations';
import Helmet from 'react-helmet';


@connect(
  state => ({
    accuratorResults: state.objects.soortenregister.results,
    accuratorLoading: state.objects.soortenregister.loading,
    accuratorLoaded: state.objects.soortenregister.loaded,
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
    accuratorResults: PropTypes.object,
    accuratorLoading: PropTypes.bool,
    accuratorLoaded: PropTypes.bool
  }
  render() {
    const styles = require('./Annotations.scss');
    const { accuratorResults, accuratorLoaded } = this.props;
    console.log(accuratorResults, accuratorLoaded);
    return (
      <div>
        <Helmet title="Annotations"/>
        <div className={`container-fluid  ${styles.noGutter} ${styles.noPadding}`}>
          <p>Sturdy annotation wall</p>
        </div>
      </div>
    );
  }
}
