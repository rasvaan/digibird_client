require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'DigiBird',
    description: 'DigiBird on the fly collection integration.',
    head: {
      titleTemplate: 'DigiBird %s',
      meta: [
        {name: 'description', content: 'DigiBird on the fly collection integration.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'DigiBird'},
        {property: 'og:image', content: 'http://www.digibird.org/favicon.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'DigiBird'},
        {property: 'og:description', content: 'DigiBird on the fly collection integration.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@rasvaan'},
        {property: 'og:creator', content: '@rasvaan'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
