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
            var promises = [];

            promises[0] = this.statisticsSparql(platform, "users_birds");
            promises[1] = this.statisticsSparql(platform, "annotations_birds");
            promises[2] = this.statisticsSparql(platform, "objects_birds");
            promises[3] = this.statisticsSparql(platform, "annotated_objects_birds");

            return Promise.all(promises)
            .then(function(data) {
                var statistics = [];

                statistics[0] = {type:"users", value:data[0].results.bindings[0].result.value};
                statistics[1] = {type:"annotations", value:data[1].results.bindings[0].result.value};
                statistics[2] = {type:"annotated objects", value:data[3].results.bindings[0].result.value};
                statistics[3] = {type:"total objects", value:data[2].results.bindings[0].result.value};

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
    statisticsSparql: function(platform, statistic) {
        var queries = this.sparqlStatisticsQueries();
        console.log("SPARQL query:", queries[statistic]);

        // query the platforms endpoint for contributions
        var options = {
            url: platform.endpoint_location,
            method: 'POST', // using post with query as body, get might be more generic?
            headers: {
                'Accept': 'application/sparql-results+json',
                'Content-Type': 'application/sparql-query'
            },
            body: queries[statistic]
        };

        return request(options)
        .then(function(response) {
            console.log(response);
            return JSON.parse(response);
        }, function (error) {
            console.log("error response:", error);
        });
    },
    sparqlStatisticsQueries: function() {
        // create an object with queries that can be used for monitor purposes
        var queries =
        {
            test:
                "SELECT ?s ?p ?o " +
                "WHERE " +
                "{ ?s ?p ?o . } " +
                "LIMIT 10",
            users:
                "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?user) as ?result) " +
                "WHERE { " +
                    "?annotation oa:hasTarget ?work . " +
                    "?annotation oa:annotatedBy ?user . " +
                "}",
            users_birds:
                "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?user) as ?result) " +
                "WHERE { " +
                    "?annotation oa:hasTarget ?object . " +
                    "?object rdf:type <http://accurator.nl/bird#Target> . " +
                    "?annotation oa:annotatedBy ?user . " +
                "}",
            annotations:
                "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?annotation) as ?result) " +
                "WHERE { " +
                    "?annotation rdf:type oa:Annotation . " +
                "}",
            annotations_birds:
                "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?annotation) as ?result) " +
                "WHERE { " +
                    "?annotation oa:hasTarget ?object . " +
                    "?object rdf:type <http://accurator.nl/bird#Target> . " +
                    "?annotation rdf:type oa:Annotation . " +
                "}",
            objects:
                "PREFIX edm: <http://www.europeana.eu/schemas/edm/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                "WHERE { ?object rdf:type edm:ProvidedCHO . }",
            objects_birds:
                "PREFIX edm: <http://www.europeana.eu/schemas/edm/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                "WHERE { " +
                    "?object rdf:type edm:ProvidedCHO . " +
                    "?object rdf:type <http://accurator.nl/bird#Target> . " +
                "}",
            annotated_objects:
                "PREFIX edm: <http://www.europeana.eu/schemas/edm/> " +
                "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                "WHERE { " +
                    "?annotation oa:hasTarget ?object . " +
                    "?object rdf:type edm:ProvidedCHO . " +
                    "?annotation rdf:type oa:Annotation . " +
                "}",
            annotated_objects_birds:
                "PREFIX oa: <http://www.w3.org/ns/oa#> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT (COUNT(DISTINCT ?object) as ?result) " +
                "WHERE { " +
                    "?annotation oa:hasTarget ?object . " +
                    "?object rdf:type <http://accurator.nl/bird#Target> . " +
                    "?annotation rdf:type oa:Annotation . " +
                "}"
        };

        return queries;
    }
}
