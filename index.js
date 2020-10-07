const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Ngrok Subdomains.');
});

// Proxy endpoints
app.use('/', createProxyMiddleware({
    target: "ngrok.io",
    changeOrigin: true,
    router: function(req) {
        var subdomain = req.headers.host.split(".")[0];
        var routes = req.url.split("/");
        var subdomain = routes[1];        
        var path = req.url.replace(`/${subdomain}`, "");
        var target = `http://${subdomain}.ngrok.io${path}`
        if(subdomain == "") {
            target = `http://ngrok.com`
        }
        console.log(target);
        return target
    }
}));
app.listen(8080, function () {
    console.log("Waiting for requests...");
});