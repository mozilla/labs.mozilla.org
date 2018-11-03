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
                title,
                buttons,
                description,
                backgroundImage: {
                    title: backgroundImageTitle = '',
                    url,
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            return <div
                className={styles.content}
                style={{backgroundImage: `url(${url})`}}
            >
                <div
                    className={styles.inner}
                >
                    <div className={styles.text}>
                        <h1>{title}</h1>
                        <p>{description}</p>

                        {buttons && buttons.length && buttons
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
