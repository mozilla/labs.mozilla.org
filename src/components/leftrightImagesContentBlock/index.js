import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.less'

export default withStyles(styles)(
    class extends Component {
        static defaultProps = {
            onRef() {
            }
        };

        componentDidMount() {
            this.props.onRef(this);
        }

        render() {
            const {
                buttons,
                imagesContentBlocks,
                theme
            } = this.props;

            return <section className={`${styles.content} ${theme && styles[theme]}`}>
                <div className={styles.inner}>
                    {imagesContentBlocks && imagesContentBlocks.length && imagesContentBlocks
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component
                                key={props.id + index}
                                theme={theme}
                                {...props}
                            />
                        )}

                    <div className={styles.buttons}>
                        {buttons && buttons.length && buttons
                            .filter(Boolean)
                            .map(([Component, props], index) =>
                                <Component key={props.id + index}{...props}/>
                            )}
                    </div>
                </div>
            </section>
        }
    }
)
