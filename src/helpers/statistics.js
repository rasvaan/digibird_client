/*******************************************************************************
DigiBird meta information component
*******************************************************************************/
var platforms = require('./platforms');
var request = require('request-promise-native');
var winston = require('winston');
var xeno_canto = require('../middlewares/xeno-canto-api');

module.exports = {
    // return a promise of statistics of the platform
    statistics: function(platformId) {
        var platform = platforms.platform(platformId);

        if (platform.endpoint_type === "json-api") {
            return this.statisticsApi(platform);
        } else if (platform.endpoint_type === "sparql") {
            var promises = [];

            for (var i=0; i<platform.statistics.length; i++)
                promises[i] = this.statisticsSparql(platform, platform.statistics[i]);

            return Promise.all(promises)
            .then(function(statistics) {
                return statistics;
            });
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
    statisticsApi: function(platform) {
        if (platform.id === "xeno-canto") {
            // formulate query
            var query = "cnt:netherlands";

            return (xeno_canto.request(query)
            .then(function(data) {
                return [{type:"Dutch contributions", value:data.numRecordings}];
            }));
        }
    },
    statisticsSparql: function(platform, statistic) {
        var queries = this.sparqlStatisticsQueries();

        // query the platforms endpoint for contributions
        var options = {
            url: platform.endpoint_location,
            method: 'POST', // using post with query as body, get might be more generic?
            headers: {
                'Accept': 'application/sparql-results+json',
                'Content-Type': 'application/sparql-query'
            },
            body: queries[statistic].query
        };

        return request(options)
        .then(function(response) {
            var value = JSON.parse(response).results.bindings[0].result.value;
            var name = queries[statistic].name;

            return { "type": name, "value": value };
        }, function (error) {
            winston.log('error', "Could not obtain SPARQL results: ", error);
            return { "type": "Error", "value": "No connection established" };
        });
    },
    sparqlStatisticsQueries: function() {
        // create an object with queries that can be used for monitor purposes
        var queries =
        {
            "test":
                {
                    "query":
                        "SELECT ?s ?p ?o " +
                        "WHERE " +
                            "{ ?s ?p ?o . } " +
                        "LIMIT 10",
                    "name": "test"
                },
            "users":
                {
                    "query":
                        "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?user) as ?result) " +
                        "WHERE { " +
                            "?annotation oa:hasTarget ?work . " +
                            "?annotation oa:annotatedBy ?user . " +
                        "}",
                    "name": "total contributors"
                },
            "users_birds":
                {
                    "query":
                        "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?user) as ?result) " +
                        "WHERE { " +
                            "?annotation oa:hasTarget ?object . " +
                            "?object rdf:type <http://accurator.nl/bird#Target> . " +
                            "?annotation oa:annotatedBy ?user . " +
                        "}",
                    "name":"contributors"
                },
            "annotations":
                {
                    "query":
                        "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?annotation) as ?result) " +
                        "WHERE { " +
                            "?annotation rdf:type oa:Annotation . " +
                        "}",
                    "name": "annotations"
                },
            "annotations_birds":
                {
                    "query":
                        "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?annotation) as ?result) " +
                        "WHERE { " +
                            "?annotation oa:hasTarget ?object . " +
                            "?object rdf:type <http://accurator.nl/bird#Target> . " +
                            "?annotation rdf:type oa:Annotation . " +
                        "}",
                    "name": "annotations"
                },
            "objects":
                {
                    "query":
                        "PREFIX edm: <http://www.europeana.eu/schemas/edm/> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                        "WHERE { ?object rdf:type edm:ProvidedCHO . }",
                    "name": "objects"
                },
            "objects_birds":
                {
                    "query":
                        "PREFIX edm: <http://www.europeana.eu/schemas/edm/> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                        "WHERE { " +
                            "?object rdf:type edm:ProvidedCHO . " +
                            "?object rdf:type <http://accurator.nl/bird#Target> . " +
                        "}",
                    "name": "objects"
                },
            "annotated_objects":
                {
                    "query":
                        "PREFIX edm: <http://www.europeana.eu/schemas/edm/> " +
                        "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                        "WHERE { " +
                            "?annotation oa:hasTarget ?object . " +
                            "?object rdf:type edm:ProvidedCHO . " +
                            "?annotation rdf:type oa:Annotation . " +
                        "}",
                    "name": "annotated objects"
                },
            "annotated_objects_birds":
                {
                    "query":
                        "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                        "WHERE { " +
                            "?annotation oa:hasTarget ?object . " +
                            "?object rdf:type <http://accurator.nl/bird#Target> . " +
                            "?annotation rdf:type oa:Annotation . " +
                        "}",
                    "name": "annotated objects"
                }
        };

        return queries;
    }
}
