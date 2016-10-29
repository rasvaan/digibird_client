import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { loadMonitor } from '../../redux/modules/monitor';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Platform, Banner, Footer } from 'components';

@connect(
  state => ({
    platforms: state.monitor.platforms,
    loading: state.monitor.loading,
    loaded: state.monitor.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadMonitor());
  }
}])
export default class Monitor extends Component {
  static propTypes = {
    platforms: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }
  createNodes(platforms) {
    const nodes = [];
    const filtered = platforms.filter(platform => {
      return platform.statistics ? true : false;
    });
    const numberRows = Math.ceil(filtered.length / 3);

    for (let row = 0; row < numberRows; row++) {
      const begin = row * 3;
      const end = begin + 3 < filtered.length ? begin + 3 : filtered.length;
      const platformNodes = this.createPlatformNodes(
        filtered.slice(begin, end)
      );

      nodes.push(
        <div key={row} className="row">{platformNodes}</div>
      );
    }

    return nodes;
  }
  createPlatformNodes(platforms) {
    return platforms.map(platform => {
      return (
        <Platform
          key={platform.id}
          name={platform.name}
          id={platform.id}
          pollInterval={platform.poll_interval}
        />
      );
    });
  }
  render() {
    const styles = require('./Monitor.scss');
    const { platforms, loading, loaded } = this.props;
    let platformNodes;

    if (loaded) {
      platformNodes = this.createNodes(platforms);
    } else if (loading) {
      platformNodes = (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h3>Loading statistics</h3>
          </div>
        </div>
      );
    } else if (!loading && !loaded) {
      platformNodes = (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h3>Unable to load statistics</h3>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet title="Monitor"/>
        <Banner title="Statistics monitor" image="error" />
        <div className={`${styles.monitor} container`}>
          {platformNodes}
        </div>
        <Footer />
      </div>
    );
  }
}
