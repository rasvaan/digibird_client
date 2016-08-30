import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { loadPlatforms } from '../../redux/modules/platforms';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Platform } from 'components';

@connect(
  state => ({
    platformMetadata: state.platforms.platformMetadata,
    loadingPlatforms: state.platforms.loading,
    platformsLoaded: state.platforms.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadPlatforms());
  }
}])
export default class Monitor extends Component {
  static propTypes = {
    platformMetadata: PropTypes.array,
    platformsLoaded: PropTypes.bool
  }

  render() {
    // const styles = require('./Monitor.scss');
    const { platformMetadata, platformsLoaded } = this.props;
    let platformNodes;

    if (platformsLoaded) {
      platformNodes = platformMetadata.map((platform) => {
        return (
          <Platform
            key={platform.id}
            name={platform.name}
            id={platform.id}
          />
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
