import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.less'

export default withStyles(styles)(
    class extends Component {
        constructor(props) {
            super(props);
            this.hero = React.createRef();
        }

        static defaultProps = {
            onRef() {}
        };

        componentDidMount() {
            this.props.onRef(this);
        }

        scrollDown = () => {
            if(process.env.BROWSER && this.hero && this.hero.current) {
                const height = this.hero.current.offsetHeight;

                if(Number(height)) {
                    window.scrollTo({
                        top: height,
                        behavior: 'smooth'
                    });
                }
            }
        };

        render() {
            const {
                title,
                buttons,
                description,
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

            return <div
                className={styles.content}
                style={{backgroundImage: `url(${url})`}}
            >
                <div
                    className={styles.inner}
                    ref={this.hero}
                >
                    <div className={styles.text}>
                        <h1>{title}</h1>
                        <p>{description}</p>

                        <div className={styles.btnWrap}>
                            {buttons && buttons.length && buttons
                                .filter(Boolean)
                                .map(([Component, props], index) =>
                                    <Component key={props.id + index} {...props}/>
                                )}
                        </div>
                    </div>
                </div>
                <span
                    className={styles.scrollDown}
                    onClick={this.scrollDown}
                />
            </div>
        }
    }
)
