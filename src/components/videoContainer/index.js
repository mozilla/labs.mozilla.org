import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        constructor(props) {
            super(props);

            this.video = React.createRef();
            this.playIcon = React.createRef();

            this.state = {
                paused: true
            }
        }

        componentDidMount() {
            if(this.video && this.video.current && process.env.BROWSER) {
                const video = this.video.current;

                video.addEventListener('pause', () =>
                    this.setState({
                        paused: true
                    })
                );

                video.addEventListener('playing', () =>
                    this.setState({
                        paused: false
                    })
                );


                video.addEventListener('click', () => this.play(video), false);

                if(this.playIcon && this.playIcon.current) {
                    console.log(1);
                    this.playIcon.current.addEventListener('click', e => this.play(video), false)
                }
            }
        }

        play = video => {
            const playPromise = video.play();

            console.log('play');

            playPromise
                .then(() => {})
                .catch(console.error);
        };

        render() {
            const {
                video: {
                    url = ''
                } = {},
                poster: {
                    url: posterUrl = ''
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <div
                    ref={this.playIcon}
                    className={styles.playIcon}
                    style={{display: this.state.paused ? '' : 'none'}}
                />
                <video
                    ref={this.video}
                    preload={'true'}
                    poster={posterUrl ? posterUrl : ''}
                    controls={!this.state.paused}
                    src={url}
                />
            </div>
        }
    }
)
