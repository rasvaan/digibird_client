var blogUtils = require('../helpers/blog');
var platformStatistics = require('../middlewares/meta-information');

module.exports.set = function(app) {

    app.get('/', function(req, res) {
        res.render('home');
    });

    app.get('/people', function(req, res) {
        res.render('people');
    });

    app.get('/blog', function(req, res) {
        // get cached blog posts
        var blogPosts = blogUtils.readCacheJson();

        // replace content between [ ]
        for (var i=0; i<blogPosts.length; i++)
            blogPosts[i].content = blogPosts[i].content.replace(/\s*\[.*?\]\s*/g, '');

        var data = { posts: blogPosts };

        // send the blog posts to the client 'blog' page
        res.render('blog', data);
    });

    app.get('/monitor', function(req, res) {
        res.render('monitor');
    });

    app.get('/api/statistics', function(req, res) {
        var platformKey = req.query.platform;
        var platform = platformStatistics.platformName(platformKey);
        var statistics = platformStatistics.statistics(platformKey);
        res.json({platform: platform, statistics:statistics});
    });

};
