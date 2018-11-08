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
                description,
                inverted,
                listImageItems,
                button: [Component, props] = []
            } = this.props;

            return <div className={`${styles.content} ${inverted && styles.inverted}`}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>

                    {
                        listImageItems &&
                        listImageItems.length &&
                        listImageItems
                            .filter(Boolean)
                            .map(([Component, props], index) =>
                                <Component
                                    key={props.id + index}
                                    inverted={inverted}
                                    {...props}
                                />
                            )
                    }

                    {Component && <div className={styles.more}>
                        <Component inverted={inverted} {...props}/>
                    </div>}
                </div>
            </div>
        }
    }
)
