'use strict';

var StatisticsContainer = React.createClass({
    getInitialState: function() {
        return { platforms: [] };
    },
    loadPlatformsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({platforms: data.platforms});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadPlatformsFromServer();
    },
    render: function() {
        var pollInterval = this.props.pollInterval;
        var apiUrl = this.props.url + "?platform=";

        var platformNodes = this.state.platforms.map(function(platform) {
            return (
                <PlatformStatisticsBox
                    key={platform.id}
                    platform={platform.name}
                    platformId={platform.id}
                    pollInterval={pollInterval}
                    url = {apiUrl}
                />
            );
        });
        return (
            <div className="row">
                {platformNodes}
            </div>
        );
    }
});

var PlatformStatisticsBox = React.createClass({
    getInitialState: function() {
        return {
            statistics: []
        };
    },
    loadStatisticsFromServer: function(platformId) {
        $.ajax({
            url: this.props.url + this.props.platformId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({statistics: data.statistics});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("API error", status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadStatisticsFromServer();
        setInterval(this.loadStatisticsFromServer, this.props.pollInterval);
    },
    render: function() {
        var statisticNodes = this.state.statistics.map(function(statistic) {
            return (
                <Statistic key={statistic.type} type={statistic.type} value={statistic.value} />
            );
        });

        return (
            <div className="platformStatisticsBox col-sm-6 col-md-4">
                <h3>Statistics {this.props.platform}</h3>
                {statisticNodes}
            </div>
        );
    }
});

var Statistic = React.createClass({
    render: function() {
        return (
            <h4 className="statistic">
                {this.props.value}
                <span> </span>
                {this.props.type}
            </h4>
        );
    }
});

// instanciate root React component and add components in statistics div
ReactDOM.render(
    <StatisticsContainer url="/api/statistics" pollInterval={10000} />,
    document.getElementById('statistics')
);
