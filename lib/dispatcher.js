var url = require('url'),
    engine = require('routeengine'),
    routeCfg = require('../cfg/settings'),
    router = engine.compile(routeCfg);

exports.onRequest = function (ctx) {
    var routeArgs = router(function (name) {
        switch (name) {
            case 'host':
                return ctx.request.headers.host;
            case 'path':
                if (!ctx.pathname) {
                    ctx.pathname = url.parse(ctx.request.url, true).pathname;
                }
                return ctx.pathname;
            case 'method':
                return ctx.request.method;
            default:
        }
    });

    if (routeArgs) {
        ctx.routeArgs = routeArgs;
        module.getHandler(routeArgs)(ctx);
    } else {
        console.log('Failed To Route Request');
        ctx.response.writeHead(404, 'File Not Found');
        ctx.response.end();
    }
};

module.getHandler = function (routeArgs) {
    var settings = routeArgs[0];
    if (toString.call(settings) === '[object String]') {
        console.dir(settings);
        return require(settings).onHandle;
    } else {
        var method = settings.method || 'onHandle';
        return require(settings.module)[method];
    }
};