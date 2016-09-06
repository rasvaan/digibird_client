import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { loadMonitor } from '../../redux/modules/monitor';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Platform } from 'components';

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
    loaded: PropTypes.bool
  }

  render() {
    // const styles = require('./Monitor.scss');
    const { platforms, loaded } = this.props;
    let platformNodes;

    if (loaded) {
      platformNodes = platforms.map((platform) => {
        return (
          <Platform
            key={platform.id}
            name={platform.name}
            id={platform.id}
            pollInterval={platform.poll_interval}
          />
        );
      });
    } else {
      platformNodes = <span>No platforms.</span>;
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
