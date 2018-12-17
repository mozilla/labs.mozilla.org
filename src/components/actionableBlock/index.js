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
                backgroundImage: {
                    url: bgImage = ''
                } = {},
                logo: {
                    url
                } = {},
                button: [Component, props] = []
            } = this.props;

            return <section
                className={styles.content}
                style={bgImage ? {backgroundImage: `url(https://${bgImage})`} : {}}
            >
                <div className={styles.inner}>
                    <div className={styles.media}>
                        <img src={`https:${url}`} alt={title}/>
                    </div>

                    <div className={styles.text}>
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>

                    <div className={styles.action}>
                        <Component inverted={true} {...props}/>
                    </div>
                </div>
            </section>
        }
    }
)
