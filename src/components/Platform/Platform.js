import React, { Component, PropTypes } from 'react';

export default class Platform extends Component {
  static propTypes = {
    name: PropTypes.string,
    statistics: PropTypes.array
  }

  render() {
    // const styles = require('./Platform.scss');
    const { name, statistics } = this.props;
    let statisticNodes;

    if (statistics.length === 0) {
      console.log('should tell the people we got no statustuc');
      statisticNodes = (<h5>No statistics available</h5>);
    } else {
      statisticNodes = statistics.map((statistic) => {
        console.log(statistic);
        return (<h5 key={statistic}>{statistic}</h5>);
      });
    }

    return (
      <div className="platform col-sm-6 col-md-4">
        <h3>Statistics {name}</h3>
        {statisticNodes}
      </div>
    );
  }
}
