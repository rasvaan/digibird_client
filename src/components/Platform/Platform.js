import React, { Component, PropTypes } from 'react';
import { Statistic } from 'components';
import { loadStatistics } from '../../redux/modules/statistics';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

@connect(
  state => ({
    statistics: state.statistics.statistics,
    statisticsLoaded: state.statistics.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadStatistics());
  }
}])
export default class Platform extends Component {
  static propTypes = {
    name: PropTypes.string,
    statistics: PropTypes.array,
    statisticsLoaded: PropTypes.bool
  }

  render() {
    // const styles = require('./Platform.scss');
    const { name, statistics, statisticsLoaded } = this.props;
    let statisticNodes;
    console.log('STATISTICS', statistics);
    if (statisticsLoaded) {
      statisticNodes = statistics.map((statistic) => {
        console.log(statistic);
        return (<Statistic key={statistic} name={statistic} />);
      });
      statisticNodes = <span>Statistics</span>;
    } else {
      statisticNodes = <span>No statistics</span>;
    }

    return (
      <div className="platform col-sm-6 col-md-4">
        <h3>Statistics {name}</h3>
        {statisticNodes}
      </div>
    );
  }
}
