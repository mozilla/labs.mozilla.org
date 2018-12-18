import path from 'path';
import fs from 'fs';

import express from 'express';
import slashes from 'connect-slashes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import apicache from 'apicache';
import sm from 'sitemap';


import Html from './Html';
import App from './App';
import ErrorPage from './components/Error';
import router, {getEntries} from './router'


const app = express();
const cache = apicache.middleware;
const port = process.env.PORT || 3000;


import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved

app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(slashes());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if(
        process.env.FORCE_HTTPS === 'true' &&
        process.env.NODE_ENV === 'production' &&
        (req.headers['x-forwarded-proto'] !== 'https' ||
            req.get('Host').indexOf('www.'))
    ) {
        return res.redirect(
            301,
            ['https://', req.get('Host').replace(/^www\./, ''), req.url].join(''),
        );
    }
    return next();
});

// sitemap
app.get('/sitemap.xml', (req, res, next) => {
    res.sendFile(`${__dirname}/public/sitemap.xml`);
});

app.get('/update-sitemap', async(req, res, next) => {
    const host = ['https://www.', req.get('Host').replace(/^www\./, '')].join('');

    const routes = await getEntries({content_type: 'page'})
        .then(response => {
            const routesArray = [];
            const {items} = response;

            if(!items.length) {
                return
            }

            items.forEach(item => {
                const {
                    sys: {updatedAt = ''},
                    fields: {pathname = ''} = {}
                } = item;

                routesArray.push({pathname, updatedAt});
            });

            return routesArray;
        })
        .catch(err => {
            console.error(err);
            res.json({
                error: err
            });
            next();
        });

    const sitemap = sm.createSitemap({
        hostname: host,
        urls: routes.map(({pathname, updatedAt}) => ({
            url: pathname === '/index' ? `${host}/` : `${host}${pathname}`,
            lastmodISO: updatedAt
        }))
    });

    fs.writeFileSync('build/public/sitemap.xml', sitemap.toString());

    res.send(sitemap);
});

// dev: list cache index
app.get('/api/cache/index', (req, res) => res.json(apicache.getIndex()));

// dev: clear cache target/group
app.get('/api/cache/clear', (req, res) => res.json(apicache.clear()));


app.get('*', cache(process.env.CACHE || '60 minute'), async(req, res, next) => {
    try {
        const css = [];

        const context = {
            insertCss: (...styles) => styles.forEach(style => css.push(style._getCss())) //eslint-disable-line
        };

        const page = await router(req.path, req.query);
        const Component = page[0];
        const props = page[1] || {};

        if(props.redirect) {
            res.redirect(props.status || 302, props.redirect);
            return
        }

        const scripts = new Set();
        const addChunk = chunk => {
            if(chunks[chunk]) {
                chunks[chunk].forEach(asset => scripts.add(asset));
            } else if(__DEV__) {
                throw new Error(`Chunk with name '${chunk}' cannot be found`);
            }
        };

        addChunk('client');
        if(props.chunk) {
            addChunk(props.chunk);
        }
        if(props.chunks) {
            props.chunks.forEach(addChunk);
        }

        props.scripts = Array.from(scripts);

        res.status(props.status || 200);

        props.children = renderToString(<App
            context={context}
            {...props}
            component={Component}/>
        );

        const html = renderToStaticMarkup(<Html styles={css} {...props}/>)

        res.send(`<!doctype html>${html}`)
    } catch(err) {
        next(err)
    }
});


app.use(async(err, req, res, next) => {
    const css = [];

    const context = {
        insertCss: (...styles) => styles.forEach(style => css.push(style._getCss())) //eslint-disable-line
    };

    const props = {scripts: []};

    const html = renderToStaticMarkup(
        <Html
            styles={css}
            title={err.message || 'Page not found'}
            props={{scripts: []}}
        >
            {renderToString(<App context={context} {...props}>
                <ErrorPage error={err}/>
            </App>)}
        </Html>
    );

    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`)
});


if(module.hot) {
    app.hot = module.hot;
    app.hot.accept('./router')
} else {
    app.listen(port, () => console.info('The server is running at http://localhost:${port}/'))
}


export default app
