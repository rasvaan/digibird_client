/*******************************************************************************
DigiBird meta information component
*******************************************************************************/
var platforms = require('../helpers/platforms');
var request = require('request-promise-native');

module.exports = {
    statistics: function(platformId) {
        var platform = platforms.platform(platformId);

        if (platform.endpoint_type === "json-api") {
            return this.statisticsJson(platform);
        } else if (platform.endpoint_type === "sparql") {
            // return this.statisticsSparql(platform);
            console.log("Get information using SPARQL query");
            this.statisticsSparql(platform);
        } else {
            var value = Math.floor((Math.random() * 10) + 1);
            var statistics = [{type:"users", value:value}];


            return new Promise(function(resolve, reject) {
                setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(statistics);
                    }, 1000);
            });
        }

        return statistics;
    },
    statisticsJson: function(platform) {
        // query the platforms endpoint for contributions from the Netherlands
        var options = {
            url: platform.endpoint_location,
            qs: { query: "cnt:netherlands" }
        };

        return request(options)
        .then(function(json) {
            var results = JSON.parse(json);
            var statistics = [{type:"Dutch contributions", value:results.numRecordings}];
            return statistics;
        });
    },
    statisticsSparql: function(platform) {
        var query =
            "SELECT ?s ?p ?o " +
            "WHERE " +
            "{ ?s ?p ?o . } " +
            "LIMIT 10";

        console.log("SPARQL query:", query);

        // query the platforms endpoint for contributions
        var options = {
            url: platform.endpoint_location,
            qs: { query: query }
        };

        return request(options)
        .then(function(response) {
            console.log("response:", response);
        }, function (error) {
            console.log("error response:", error);
        });
    }
}
