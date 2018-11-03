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
            // console.log('left right', this.props);

            const {
                buttons,
                imagesContentBlocks
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        {buttons && buttons.length && buttons
                            .filter(Boolean)
                            .map(([Component, props], index) =>
                                <Component key={props.id + index} {...props}/>
                            )}

                        {imagesContentBlocks && imagesContentBlocks.length && imagesContentBlocks
                            .filter(Boolean)
                            .map(([Component, props], index) =>
                                <Component key={props.id + index} {...props}/>
                            )}
                    </div>
                </div>
            </div>
        }
    }
)
