import React, { Component, PropTypes } from 'react';
import { Statistic } from 'components';
import request from 'superagent';

export default class Platform extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {statistics: []};
  }
  componentDidMount() {
    this.loadStatisticsFromServer();
    // setInterval(this.loadStatisticsFromServer, this.props.pollInterval);
  }
  loadStatisticsFromServer() {
    const url = `/api/statistics?platform=${this.props.id}`;

    request
    .get(url)
    .end((err, res) => {
      if (err) {
        console.error(`API error`, status, err.toString());
      } else {
        this.setState({statistics: res.body.statistics});
      }
    });
  }
  render() {
    // const styles = require('./Platform.scss');
    const { name } = this.props;
    let statisticNodes;

    if (this.state.statistics.length === 0) {
      statisticNodes = (<h4>No statistics available</h4>);
    } else {
      statisticNodes = this.state.statistics.map((statistic) => {
        return (
          <Statistic
            key={statistic.type}
            type={statistic.type}
            value={statistic.value}
          />
        );
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
