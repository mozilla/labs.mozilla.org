import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        render() {
            const {
                image: {
                    title,
                    url,
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <img
                    src={url}
                    alt={title}
                />
            </div>
        }
    }
)
