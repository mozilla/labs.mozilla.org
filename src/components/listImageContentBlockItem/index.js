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
                description,
                image: {
                    title,
                    url,
                    details: {
                        image: {width} = {}
                    } = {}
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.media}>
                        <img
                            // src={`${url}?w=${Math.ceil(width/2).toFixed()}`}
                            // srcSet={`${url} 2x`}
                            src={url}
                            alt={title}
                        />
                    </div>

                    <div className={styles.text}>
                        <p>{description}</p>

                    </div>
                </div>
            </div>
        }
    }
)
