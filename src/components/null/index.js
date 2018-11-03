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
            console.log('null', this.props);

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        <h1>null</h1>
                    </div>
                </div>
            </div>
        }
    }
)
