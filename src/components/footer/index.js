import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.less'

export default withStyles(styles)(
    class extends Component {
        static defaultProps = {
            onRef() {
            }
        };

        componentDidMount() {
            this.props.onRef(this);
        }

        render() {
            const {
                copyright,
                buttonsBlock,
                links,
                linksBlock,
                logo: {
                    title,
                    url,
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            return <footer className={styles.content}>
                <div className={styles.inner}>

                    <div className={styles.logo}>
                        <img src={url} alt={title}/>
                    </div>


                    <div className={styles.wrap}>
                        {linksBlock && linksBlock.length && linksBlock
                            .filter(Boolean)
                            .map(([Component, props], index) =>
                                <Component key={props.id + index} {...props}/>
                            )}
                    </div>


                    <div className={styles.wrap2}>
                        <div className={styles.text}>
                            <p>{copyright}</p>

                            <div className={styles.links}>
                                {links && links.length && links
                                    .filter(Boolean)
                                    .map(([Component, props], index) =>
                                        <Component key={props.id + index} {...props}/>
                                    )}
                            </div>
                        </div>

                        <div className={styles.social}>
                            <div>
                                {buttonsBlock && buttonsBlock.length && buttonsBlock
                                    .filter(Boolean)
                                    .map(([Component, props], index) =>
                                        <Component key={props.id + index} {...props}/>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        }
    }
)
