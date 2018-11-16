import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import md from '../../utils/md'

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
                buttons,
                description
            } = this.props;

            return <section className={styles.content}>
                <div dangerouslySetInnerHTML={{__html: md.render(description)}}/>

                <div className={styles.inner}>
                    {buttons && buttons.length && buttons
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component
                                key={props.id + index}
                                {...props}
                            />
                        )}
                </div>
            </section>
        }
    }
)
