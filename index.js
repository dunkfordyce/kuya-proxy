var http = require('http'),
    httpProxy = require('http-proxy'),
    btoa = require('btoa'),
    url = require('url'),
    _ = require('underscore'),
    config = _.defaults(JSON.parse(
            require('fs').readFileSync(
                require('findup-sync')('package.json')
            ).toString()
        ), {
            auth_domains: [],
            auth: 'user:pass',
            debug: false,
            dev_src: 'http://foo',
            dev_target: 'http://bar',
            port: 5005
        }
    ),
    pass = 'Basic '+require('btoa')(config.auth),
    proxy = httpProxy.createProxyServer({secure: false});

function should_add_auth(url) { 
    return config.auth_domains.indexOf(url.hostname) != -1;
}

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    var u = url.parse(req.url);
    if( should_add_auth(url.parse(req.url)) ) { 
        if( config.debug ) { 
            console.log('adding auth for', req.url);
        }
        proxyReq.setHeader('Authorization', pass);
    }
});

proxy.on('error', function (err, req, res) {
    console.log('err', err);
});

var server = http.createServer(function(req, res) {
    var u = url.parse(req.url),
        nu = u.protocol+'//'+u.host; 
    
    if( u.host == config.dev_src ) {
        nu = config.dev_target;
    } 
    if( config.debug ) { 
        console.log(u.host, '-->', nu);
    }
    proxy.web(req, res, { target: nu});
});

console.log('listening', config.port);
server.listen(config.port);
