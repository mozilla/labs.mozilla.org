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
                form: [Form, props] = [],
                image: {
                    url,
                    details: {
                        image: {width} = {}
                    } = {}
                } = {}
            } = this.props;

            return <section className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.media}>
                        <img
                            src={`https:${url}?w=${Math.ceil(width/2).toFixed()}`}
                            srcSet={`https:${url} 2x`}
                            alt={title}/>
                    </div>

                    <Form {...props}/>
                </div>
            </section>
        }
    }
)
