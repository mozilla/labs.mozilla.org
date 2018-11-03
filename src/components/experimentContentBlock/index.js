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
                image: {
                    title: imageTitle = '',
                    url,
                    details: {width} = {}
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        <h1>{title}</h1>
                        <p>{description}</p>

                        <img src={url} alt={imageTitle}/>
                    </div>
                </div>
            </div>
        }
    }
)
