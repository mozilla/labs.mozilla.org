import React from 'react'
import {hydrate, render} from 'react-dom'
import deepForceUpdate from 'react-deep-force-update'
import {parse} from 'query-string'

import history from './history'
import {updateMeta} from './DOMUtils'
import router from './router'
import App from './App'

const context = {
    insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss()); // eslint-disable-line

        return () => removeCss.forEach(f => f())
    }
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

if(window.history && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
}


async function onLocationChange(location, action) {
    scrollPositionsHistory[currentLocation.key] = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset
    };

    if(action === 'PUSH') {
        delete scrollPositionsHistory[location.key]
    }

    const isInitialRender = !action;

    if(!isInitialRender && currentLocation.pathname === location.pathname) {
        return
    }
    currentLocation = location;

    try {
        const route = await router(location.pathname, parse(location.search));
        const Component = route[0];
        const props = route[1];

        container.setAttribute('data-loading', !isInitialRender);

        if(props && !props.redirect) {
            appInstance = (isInitialRender ? hydrate : render)(
                <App context={context}>
                    <Component {...props}/>
                </App>,
                container,
                () => {
                    if(isInitialRender) {
                        const elem = document.getElementById('css');

                        if(elem) {
                            elem.parentNode.removeChild(elem)
                        }

                        return
                    }

                    document.title = props.title;

                    updateMeta('description', props.description);
                    updateMeta('keywords', props.keywords);

                    // Update necessary tags in <head> at runtime here, ie:
                    // updateCustomMeta('og:url', route.canonicalUrl);
                    // updateCustomMeta('og:image', route.imageUrl);
                    // updateLink('canonical', route.canonicalUrl);
                    // etc.

                    let scrollX = 0;
                    let scrollY = 0;
                    const pos = scrollPositionsHistory[location.key];

                    if(pos) {
                        scrollX = pos.scrollX;
                        scrollY = pos.scrollY;
                    } else {
                        const targetHash = location.hash.slice(1);

                        if(targetHash) {
                            const target = document.getElementById(targetHash);

                            if(target) {
                                scrollY = window.pageYOffset + target.getBoundingClientRect().top
                            }
                        }
                    }

                    if(!props.isModal) {
                        window.scrollTo(scrollX, scrollY)
                    }
                }
            );
        } else
        if(String(props.redirect)[0] === '/') {
            history.replace(props.redirect)
        } else {
            window.location.replace(props.redirect)
        }
    } catch(err) {
        //if(__DEV__) {
        //    throw err
        //}

        console.error(err);

        if(!isInitialRender && currentLocation.key === location.key) {
            window.location.reload()
        }
    }

    container.setAttribute('data-loading', false)
}

history.listen(onLocationChange);
onLocationChange(currentLocation);


document.addEventListener('click', event => {
    if((event.which === null ? event.button : event.which) !== 1) {
        return
    }

    if(event.metaKey || event.ctrlKey || event.shiftKey) {
        return
    }

    if(event.defaultPrevented) {
        return
    }

    let target = event.path ? event.path[0] : event.target;

    while(target && target.nodeName !== 'A') {
        target = target.parentNode
    }

    if(!target || target.nodeName !== 'A') {
        return
    }

    if(target.hasAttribute('download') || target.getAttribute('rel') === 'external') {
        return
    }

    if(target.pathname === currentLocation.pathname && target.hash) {
        return
    }

    if(!target.href.indexOf('mailto:')) {
        return
    }

    if(target.target) {
        return;
    }

    if(target.origin !== window.location.origin) {
        return
    }

    event.preventDefault();

    history.push(target.pathname + target.search + (target.hash || ''))
}, false);


if(module.hot) {
    module.hot.accept('./router', () => {
        if(appInstance && appInstance.updater.isMounted(appInstance)) {
            deepForceUpdate(appInstance)
        }

        onLocationChange(currentLocation)
    })
}
