import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

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
                title,
                description,
                experiments
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.text}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>

                <div className={styles.inner}>
                    {experiments && experiments.length && experiments
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component key={props.id + index} {...props}/>
                        )}
                </div>
            </div>
        }
    }
)
