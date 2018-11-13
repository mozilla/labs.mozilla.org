import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

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
                const top = this.hero.current.offsetTop;

                if(Number(height) && top === 0 || Number(top)) {
                    window.scrollTo({
                        top: top + height,
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
                ref={this.hero}
            >
                <div className={styles.inner}>
                    <div>
                        <div className={
                            `${styles.text} ${textDarkBackground ? styles.darkText : ''}`
                        }>
                            <h1>{title}</h1>
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
                <span
                    className={styles.scrollDown}
                    onClick={this.scrollDown}
                />
            </section>
        }
    }
)
