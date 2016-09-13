
process.env.VUE_ENV = 'server';

const isProd = process.env.NODE_ENV === 'production';

const fs = require('fs');

const path = require('path');

const resolve = file => path.resolve(__dirname, file);

const express = require('express');

const favicon = require('serve-favicon');

const serialize = require('serialize-javascript');

const handle = require('./src/server/handle.js');

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const app = express();

const html = (() => {

    const template = fs.readFileSync(resolve('./index.html'), 'utf-8');

    const i = template.indexOf('{{ APP }}');

    const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : '';

    return {
        head: template.slice(0, i).replace('{{ STYLE }}', style),
        tail: template.slice(i + '{{ APP }}'.length)
    }

})();

var renderer;

if (isProd) {

    const bundlePath = resolve('./dist/server-bundle.js');

    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));

} else {

    require('./build/setup-dev-server')(app, bundle => {
        renderer = createRenderer(bundle)
    })
}

function createRenderer (bundle) {
    return createBundleRenderer(bundle, {
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    })
}

app.use('/dist', express.static(resolve('./dist')));

app.use(favicon(resolve('./src/assets/logo.png')));

app.get('*', function(req, res) {

    if (!renderer) {
        return res.end('waiting for compilation...')
    }

    var urlStruct = req.url.split('/');

    var url = [];

    for(var e = 0; e < urlStruct.length; e++) {
        if(urlStruct[e]) {
            url.push(urlStruct[e]);
        }
    }

    if(url[0] == 'api') {

        handle(req, url).then(function(data) {res.end(JSON.stringify(data));});

    } else {

        var s = Date.now();

        const context = { url: req.url };

        const renderStream = renderer.renderToStream(context);

        var firstChunk = true;

        res.write(html.head);

        renderStream.on('data', function(chunk) {
            if (firstChunk) {
                if (context.initialState) {
                    res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`);
                }
                firstChunk = false;
            }
            res.write(chunk);
        });

        renderStream.on('end', function() {
            res.end(html.tail);
            console.log(`whole request: ${Date.now() - s}ms`)
        });

        renderStream.on('error', function(err) {
            throw err
        });
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {console.log(`server started at localhost:${port}`)});