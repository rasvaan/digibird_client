var blogUtils = require('../helpers/blog');
var platformStatistics = require('../middlewares/meta-information');
var platforms = require('../helpers/platforms');

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
        var platformId = req.query.platform;
        
        if(!platformId) {
            var platformIds = platforms.platformIds();

            // no specific platform specified, reply available platforms
            res.json({platforms: platformIds});
        } else {
            var platform = platforms.platform(platformId);
            console.log(platform);
            var statistics = platformStatistics.statistics(platformId);
            res.json({platform: platform.name, statistics:statistics});
        }
    });

};
