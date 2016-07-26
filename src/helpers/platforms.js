/*******************************************************************************
DigiBird Platforms

Functions used to retrieve information about the different platforms
incoorporated in DigiBird
*******************************************************************************/
var fs = require('fs');
var PLATFORM_FILE = path.join(__dirname, 'platforms.json');

module.exports = {
    platforms: function() {
        try {
            var contents = fs.readFileSync(PLATFORM_FILE, 'utf-8');
            var parsed = JSON.parse(contents);
        } catch (error) {
            winston.log('error', error);
        }

        return parsed;
    },
    platformKeys: function() {
        var data = this.platforms();
        var platformKeys = [];

        for (var i=0; i<data.length; i++)
            platformKeys[i] = data[i].key;

        return platformKeys;
    },
    statistics: function(platformKey) {
        var value = Math.floor((Math.random() * 10) + 1);

        return [{type:"users", value:value}];
    },
    platformName: function(platformKey) {
        var data = this.platforms();

        for (var i=0; i<data.length; i++) {
            if (platformKey === data[i].key)
                return data[i].platform;
        }
        return null;
    }
}
