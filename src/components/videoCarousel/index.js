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
                videoCarousel
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>

                    {videoCarousel && videoCarousel.length && <div className="slider">
                        {videoCarousel

                            // .filter(Boolean) // TODO: reVideo
                            .map(({id, title, video: {url = ''} = {}}) =>
                                <video
                                    key={id}
                                    src={url}
                                />
                            )}
                    </div>}
                </div>
            </div>
        }
    }
)
