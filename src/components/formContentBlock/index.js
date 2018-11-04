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
                image: {
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
                            src={`${url}?w=${Math.ceil(width/2).toFixed()}`}
                            srcSet={`${url} 2x`}
                            alt={title}/>
                    </div>

                    <div className={styles.text}>
                        <div>
                            <h1>{title}</h1>

                            <label htmlFor="email_signup">
                                <input id="email_signup" type="email"/>
                            </label>

                            <div>
                                <button>Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
)
