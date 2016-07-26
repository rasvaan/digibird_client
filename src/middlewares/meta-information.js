/*******************************************************************************
DigiBird meta information component
*******************************************************************************/

module.exports = {
    statistics: function(platformKey) {
        var value = Math.floor((Math.random() * 10) + 1);

        return [{type:"users", value:value}];
    }
}
