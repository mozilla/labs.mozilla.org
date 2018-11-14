import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import {connect} from 'react-redux'

import {
    desktopMenuVisibilityHandler,
    mobileMenuVisibilityHandler
} from '../../utils/store'

import styles from './index.scss'

export default withStyles(styles)(
    connect(
        ({
            desktopMenuVisibility,
            mobileMenuVisibility,
            headerInverted,
            headerVisibility
        }) => ({
            desktopMenuVisibility,
            mobileMenuVisibility,
            headerInverted,
            headerVisibility
        })
    )(
        class extends Component {
            static defaultProps = {
                onRef() {}
            };

            componentDidMount() {
                this.props.onRef(this);
            }

            bodyOverflow = bool => {
                if(process.env.BROWSER) {
                    const body = document.body;

                    if(body) {
                        body.style.overflow = bool ? 'visible' : 'hidden';
                    }
                }
            };

            get viewportWidth() {
                return process.env.BROWSER ?
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth :
                    0
            }

            switchVisibility = () => {
                const {
                    dispatch,
                    desktopMenuVisibility,
                    mobileMenuVisibility
                } = this.props;

                dispatch(
                    this.viewportWidth < 769 ?
                        mobileMenuVisibilityHandler(!mobileMenuVisibility) :
                        desktopMenuVisibilityHandler(!desktopMenuVisibility)
                );

                this.bodyOverflow(mobileMenuVisibility);
            };

            closeMobile = () => {
                const {
                    dispatch
                } = this.props;

                if(this.viewportWidth < 769) {
                    dispatch(
                        mobileMenuVisibilityHandler(false)
                    );

                    this.bodyOverflow(1)
                }
            };

            render() {
                const {
                    location: {pathname},
                    theme,
                    logo: {
                        url,
                        title,
                    } = {},
                    items,

                    desktopMenuVisibility,
                    mobileMenuVisibility
                } = this.props;

                return <header className={[
                    styles.content,
                    theme ? styles.dark : '',
                    desktopMenuVisibility && styles.desktopOpened,
                    mobileMenuVisibility && styles.mobileOpened
                ].filter(Boolean).join(' ')}>
                    <div className={styles.inner}>
                        <a
                            href="/"
                            className={styles.logo}
                            onClick={this.closeMobile}
                        >
                            <img src={url} alt={title}/>
                        </a>

                        <ul>
                            {items && items.length && items
                                .map(([Component, props], index) =>
                                    <li
                                        onClick={this.closeMobile}
                                        key={props.id + index}
                                        className={props.url === pathname ? styles.active : ''}
                                    >
                                        <Component {...props}/>
                                    </li>
                                )}
                        </ul>

                        <div className={styles.overlay} onClick={this.switchVisibility}/>

                        <button
                            className={styles.openMenu}
                            onClick={this.switchVisibility}
                        >
                            <span/><span/><span/>
                        </button>
                    </div>
                </header>
            }
        }
    )
)
