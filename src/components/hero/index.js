import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        constructor(props) {
            super(props);
        }

        static defaultProps = {
            onRef() {}
        };

        componentDidMount() {
            this.props.onRef(this);
        }

        render() {
            const {
                title,
                buttons,
                description,
                textDarkBackground,
                backgroundImage: {
                    title: backgroundImageTitle = '',
                    url,
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            return <section
                className={styles.content}
                style={{backgroundImage: `url(${url})`}}
            >
                <div className={styles.inner}>
                    <div>
                        <div className={
                            `${styles.text} ${textDarkBackground ? styles.darkText : ''}`
                        }>
                            <h2>{title}</h2>
                            <div>
                                <p>{description}</p>
                            </div>
                        </div>

                        <div className={styles.btnWrap}>
                            {buttons && buttons.length && buttons
                                .filter(Boolean)
                                .map(([Component, props], index) =>
                                    <Component key={props.id + index} {...props}/>
                                )}
                        </div>
                    </div>
                </div>
            </section>
        }
    }
)
