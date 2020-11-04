const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', { target: '(http://localhost:5001/showdown-771b8/us-central1/api' }))
}
