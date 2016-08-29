import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { load } from '../../redux/modules/platforms';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Platform } from 'components';

@connect(
  state => ({
    platforms: state.platforms.platforms,
    loadingPlatforms: state.platforms.loading,
    platformsLoaded: state.platforms.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(load());
  }
}])
export default class Monitor extends Component {
  static propTypes = {
    platforms: PropTypes.object,
    loadingPlatforms: PropTypes.bool,
    loadPlatforms: PropTypes.func,
    platformsLoaded: PropTypes.bool
  }

  render() {
    // const styles = require('./Monitor.scss');
    const {platforms, platformsLoaded} = this.props;
    let platformNodes;

    if (platformsLoaded) {
      platformNodes = platforms.platforms.map((platform) => {
        return (
          <Platform name={platform.name} />
        );
      });
    } else {
      platformNodes = <span>No platforms</span>;
    }

    return (
      <div>
        <Helmet title="Monitor"/>
        <div className="container">
          {platformNodes}
        </div>
      </div>
    );
  }
}
