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
                image: {
                    title: imageTitle = '',
                    url
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.media}>
                        <img src={`https:${url}`} alt={imageTitle}/>
                    </div>

                    <div className={styles.text}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        }
    }
)
