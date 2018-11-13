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
                button: [Component, props] = [],
                imagePosition,
                theme,
                image: {
                    title: imageTitle,
                    url,
                    details: {
                        image: {width} = {}
                    } = {}
                } = {}
            } = this.props;

            return <div className={
                `${styles.content}
                 ${imagePosition ? styles.right : ''}`}>
                <div className={styles.media}>
                    <img
                        src={`${url}?w=${Math.ceil(width / 2).toFixed()}`}
                        srcSet={`${url} 2x`}
                        alt={imageTitle}
                    />
                </div>
                <div className={styles.text}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    {Component && <Component theme={theme} {...props}/>}
                </div>
            </div>
        }
    }
)
