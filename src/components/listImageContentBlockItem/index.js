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
                title: mainTitle = '',
                description,
                link,
                inverted,
                grid,
                image: {
                    title,
                    url,
                    details: {
                        image: {width} = {}
                    } = {}
                } = {}
            } = this.props;

            return <div className={
                `${styles.content}
                ${inverted && styles.inverted}
                ${grid ? styles.vertical : ''}`
            }>
                <a href={link && link} className={styles.inner}>
                    <div className={styles.media}>
                        <img
                            src={`${url}?w=${Math.ceil(width/2).toFixed()}`}
                            srcSet={`${url} 2x`}
                            alt={title}
                        />
                    </div>

                    <div className={styles.text}>
                        <h4>{mainTitle}</h4>
                        <p>{description}</p>
                    </div>
                </a>
            </div>
        }
    }
)
