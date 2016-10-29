import React, { Component, PropTypes } from 'react';
import { Statistic } from 'components';
import request from 'superagent';

export default class Platform extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    pollInterval: PropTypes.number
  }
  constructor(props) {
    super(props);
    this.state = {statistics: []};
  }
  componentDidMount() {
    this.loadStatisticsFromServer();
    this.intervalId = setInterval(
      this.loadStatisticsFromServer.bind(this),
      this.props.pollInterval
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  intervalId = null;
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
    const styles = require('./Platform.scss');
    const { name } = this.props;
    let statisticNodes;

    if (this.state.statistics.length === 0) {
      statisticNodes = (<h4>No statistics available</h4>);
    } else {
      statisticNodes = this.state.statistics.map((statistic) => {
        // make sure every value is of type string
        if (typeof statistic.value === 'number') {
          statistic.value = statistic.value.toString();
        }

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
      <div className={`${styles.platform} col-sm-4 col-md-4`}>
        <h3 className={styles.platformHeader}>Statistics {name}</h3>
        {statisticNodes}
      </div>
    );
  }
}
