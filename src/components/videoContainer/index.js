import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        render() {
            const {
                // id,
                // title,
                video: {
                    url = ''
                } = {},
                poster: {
                    url: posterUrl = ''
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <video
                    preload={'true'}
                    poster={posterUrl ? posterUrl : ''}
                    controls
                    src={url}
                />
            </div>
        }
    }
)
