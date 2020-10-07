var httpProxy = require('http-proxy');
var url       = require('url');
const proxy = httpProxy.createProxyServer({})
require('http').createServer(function(req, res) {
    console.log(req.url)
    var subdomain = req.headers.host.split(".")[0];

    var routes = req.url.split("/");
    var subdomain = routes[1];
    var target = `http://${subdomain}.ngrok.io`
    if(subdomain == "") {
        target = "http://ngrok.com"
    }    
    console.log(`Routing to: ${target}`);
    proxy.web(req, res, { target: target })
}).listen(8080, function () {
    console.log("Waiting for requests...");
});