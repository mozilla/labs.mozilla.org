import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        async componentDidMount() {
            if(process.env.BROWSER) {
                const smoothscroll = await import('smoothscroll-polyfill');

                smoothscroll.polyfill();

                await import('intersection-observer');

                this.intersectionObserver = new IntersectionObserver((entries, observer) =>
                    entries.forEach(entry => {
                        if(entry.intersectionRatio) {
                            observer.unobserve(entry.target);

                            setTimeout(() => entry.target.setAttribute('data-intersection', 'true'), 100)
                        }
                    })
                );

                Object.keys(this.observeElements).forEach(id =>
                    this.observe(id, this.observeElements[id])
                )
            }
        }

        componentWillUnmount() {
            if(process.env.BROWSER) {
                window.onhashchange = null;
            }
        }

        observe(id, target) {
            this.observeElements[id] = target;

            if(this.intersectionObserver) {
                this.intersectionObserver.observe(target)
            }
        }

        observeElements = {};
        addToObserver = component => {
            const element = findDOMNode(component);

            element.setAttribute('data-observing', 'true');

            this.observe(component.props.id, element)
        };

        render() {
            const {
                header: [Header, headerProps] = [],
                content,
                footer: [Footer, footerProps] = []
            } = this.props;

            const compiledContent = [].concat(content)
                .filter(data => data instanceof Array && data.length === 2)
                .map(([Component, props]) =>
                    <Component key={props.id} onRef={this.addToObserver} {...props}/>
                );

            return [
                Header && <Header key={headerProps.id} {...headerProps}/>,
                content && <main key="content" className={styles.content}>
                    {compiledContent}
                </main>,
                Footer && <Footer key={footerProps.id} {...footerProps}/>
            ]
        }
    }
)
