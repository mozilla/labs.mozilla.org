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

        scrollNext = e => {
            if(process.env.BROWSER) {
                const section = e.target.closest('section');

                if(section !== null) {
                    const height = section.offsetHeight;
                    const top = section.offsetTop;

                    if(Number(height) && top === 0 || Number(top)) {
                        window.scrollTo({
                            top: top + height,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        };

        render() {
            const {
                title,
                class: buttonClass,
                size,
                url,
                theme,
                inverted,
                type,
                scrollToNextBlock = false,
                image: {
                    url: imageUrl = '',
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            if(type || !url) {
                return <button
                    type={type}
                    onClick={scrollToNextBlock ? this.scrollNext : () => {}}
                    style={scrollToNextBlock ? {cursor: 'pointer'} : {}}
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
            }

            const reImage = /\.(bmp|gif|jpg|jpeg|png)$/;

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
                {imageUrl ? reImage.test(imageUrl) ?
                    <img
                        src={`https:${imageUrl}?scale=fit&w=${Math.ceil(width/2).toFixed()}`}
                        srcSet={`https:${imageUrl} 2x`}
                        alt={title}/> :
                    <img src={`https:${imageUrl}`} alt={title}/> :
                    <span>{title}</span>}
            </a>
        }
    }
)
