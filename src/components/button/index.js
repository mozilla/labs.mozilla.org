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
                class: buttonClass,
                size,
                url,
                theme,
                inverted,
                type,
                image: {
                    url: imageUrl = '',
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            if(type) {
                return <button
                    type={type}
                    className={
                        `${styles.button}
                        ${buttonClass ? styles[buttonClass] : ''}
                        ${size ? styles[size] : ''}
                        ${inverted ? styles.inverted : ''}
                        ${theme ? styles[theme] : ''}`
                    }
                >
                    <span>{title}</span>
                </button>
            } else {
                return <a
                    href={url}
                    className={
                        `${styles.button}
                        ${buttonClass ? styles[buttonClass] : ''}
                        ${size ? styles[size] : ''}
                        ${inverted ? styles.inverted : ''}
                        ${theme ? styles[theme] : ''}`
                    }
                >
                    {imageUrl ?
                        <img
                            src={`${imageUrl}?scale=fit&w=${Math.ceil(width/2).toFixed()}`}
                            srcSet={`${imageUrl} 2x`}
                            alt={title}/> :
                        <span>{title}</span>}
                </a>
            }
        }
    }
)
