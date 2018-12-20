import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        render() {
            const {
                title: mainTitle = '',
                description,
                theme,
                grid,
                image: {
                    title,
                    url,
                    details: {
                        image: {width} = {}
                    } = {}
                } = {},
                linkItem: [Component, props] = []
            } = this.props;

            return <div className={
                `${styles.content}
                ${theme ? styles[theme] : ''}
                ${grid && styles[grid]}`
            }>
                <a
                    target={props && props.blank && '_blank'}
                    rel={props && props.rel && 'noopener'}
                    href={props && props.url}
                    className={styles.inner}
                >
                    <div className={styles.media}>
                        <img
                            src={`https:${url}?w=${Math.ceil(width/2).toFixed()}`}
                            srcSet={`https:${url} 2x`}
                            alt={title}
                        />
                    </div>

                    <div className={styles.text}>
                        <h5>{mainTitle}</h5>
                        <p>{description}</p>
                    </div>
                </a>
            </div>
        }
    }
)
