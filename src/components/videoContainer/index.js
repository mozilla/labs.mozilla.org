import React, {Component} from 'react'
import YouTube from 'react-youtube';
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        constructor(props) {
            super(props);

            this.video = React.createRef();
            this.playIcon = React.createRef();
            this.ytVideo = React.createRef();

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

                if(this.playIcon && this.playIcon.current) {
                    this.playIcon.current
                        .addEventListener('click', () => this.play(video), false)
                }
            }
        }

        play = video => {
            const playPromise = video.play();

            playPromise
                .then(() => {})
                .catch(console.error);
        };

        componentWillUpdate() {
            this.ytPause();
        }

        ytPause = () => {
            if(this.ytVideo && this.ytVideo.current && this.ytVideo.current.internalPlayer) {
                this.ytVideo.current.internalPlayer.pauseVideo();
            }
        };


        render() {
            const {
                video: {
                    url = ''
                } = {},
                poster: {
                    url: posterUrl = ''
                } = {},
                youtubeVideoId
            } = this.props;

            return <div className={styles.content}>
                {youtubeVideoId ? <div className={styles.videoWrapper}>
                    <YouTube
                        ref={this.ytVideo}
                        videoId={youtubeVideoId}
                    />
                </div> : [
                    <div
                        key="playIcon"
                        ref={this.playIcon}
                        className={styles.playIcon}
                        style={{display: this.state.paused ? '' : 'none'}}
                    />,
                    <video
                        key="video"
                        ref={this.video}
                        preload={'true'}
                        poster={posterUrl ? posterUrl : ''}
                        controls={!this.state.paused}
                        src={url}
                    />]
                }
            </div>
        }
    }
)
