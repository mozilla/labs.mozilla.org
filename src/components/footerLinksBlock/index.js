import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        render() {
            const {
                title,
                links
            } = this.props;

            return <div className={styles.content}>
                <p>{title}</p>

                <div className={styles.inner}>
                    {links && links.length && links
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component key={props.id + index} {...props}/>
                        )}
                </div>
            </div>
        }
    }
)
