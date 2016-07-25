/*******************************************************************************
DigiBird meta information component
*******************************************************************************/

module.exports = {
    platformData: function() {
        return ([
            {platform:"Xeno-canto",
             key:"xeno-canto"},
            {platform:"Accurator",
             key:"accurator"},
            {platform:"Waisda?",
             key:"waisda"}
        ]);
    },
    platforms: function() {
        var data = this.platformData();
        var platforms = [];

        for (var i=0; i<data.length; i++)
            platforms[i] = data[i].key;

        return platforms;
    },
    statistics: function(platformKey) {
        var value = Math.floor((Math.random() * 10) + 1);

        return [{type:"users", value:value}];
    },
    platformName: function(platformKey) {
        var data = this.platformData();

        for (var i=0; i<data.length; i++) {
            if (platformKey === data[i].key)
                return data[i].platform;
        }
        return "";
    }
}
