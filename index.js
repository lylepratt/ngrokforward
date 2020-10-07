var httpProxy = require('http-proxy');
var url       = require('url');
const proxy = httpProxy.createProxyServer({})
require('http').createServer(function(req, res) {
    var subdomain = req.headers.host.split(".")[0];
    var target = `https://${subdomain}.ngrok.io`
    console.log(`Routing to: ${target}`);
    proxy.web(req, res, { target: target })
}).listen(80, function () {
    console.log("Waiting for requests...");
});