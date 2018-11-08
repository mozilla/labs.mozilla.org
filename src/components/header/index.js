import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.less'

export default withStyles(styles)(
    class extends Component {
        static defaultProps = {
            onRef() {}
        };

        componentDidMount() {
            this.props.onRef(this);
        }

        render() {
            const {
                theme,
                logo: {
                    url,
                    title,
                } = {},
                items
            } = this.props;

            return <div className={
                `${styles.content} ${theme ? styles.dark : ''}`
            }>
                <div className={styles.inner}>
                    <a href="/" className={styles.logo}>
                        <img src={url} alt={title}/>
                    </a>

                    <div className={styles.text}>
                        {items && items.length && items
                            .map(([Component, props], index) =>
                                <Component key={props.id + index} {...props}/>
                            )}
                    </div>
                </div>
            </div>
        }
    }
)
