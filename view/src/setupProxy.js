const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', {target: 'http://localhost:5000/showdown-771b8/us-central1/api'}))
}
