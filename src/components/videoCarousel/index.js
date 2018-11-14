import React, {Component} from 'react'
import Swiper from 'swiper/dist/js/swiper.min'
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

        initSwiper = async el => {
            // if(this.props.videoCarousel && !this.props.videoCaraousel.length) {}
            if(!el || this.swiper) {
                return
            }

            const self = this;

            self.swiper = new Swiper(el, {
                direction: 'horizontal',
                wrapperClass: styles.wrapper,
                slideClass: styles.slide,
                slideActiveClass: styles.active,
                slideNextClass: styles.next,
                slidePrevClass: styles.prev,
                slideToClickedSlide: false,
                pagination: {
                    el: `.${styles['slider-pagination']}`,
                    clickable: true,
                    bulletClass: styles.bullet,
                    bulletActiveClass: styles.active
                },
                navigation: {
                    prevEl: `.${styles['slider-btn-prev']}`,
                    nextEl: `.${styles['slider-btn-next']}`,
                    disabledClass: styles.disabled
                }
            })
        };

        componentWillUnmount() {
            if(this.swiper && this.swiper.destroy instanceof Function) {
                // TODO: test
                this.swiper.destroy(true, false)
            }
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
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>

                    {videoCarousel && videoCarousel.length && <div
                        ref={this.initSwiper}
                        className={styles.container}
                    >
                        <div className={styles.wrapper}>
                            {videoCarousel
                                .filter(Boolean) // TODO: reVideo
                                .map((
                                    {
                                        id,
                                        title,
                                        video: {
                                            url = ''
                                        } = {},
                                        poster: {
                                            url: posterUrl = ''
                                        } = {}
                                    },
                                    index) =>
                                    <video
                                        key={id + index}
                                        className={styles.slide}
                                        preload={'true'}
                                        poster={posterUrl ? posterUrl : ''}
                                        controls
                                        src={url}
                                    />
                                )}
                        </div>
                    </div>}

                    {videoCarousel && videoCarousel.length > 1 && [
                        <div className={styles['slider-pagination']}/>,

                        <div className={styles['slider-btn-prev']}>
                            <svg width="33" height="61" viewBox="0 0 33 61" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.698 57.154a2 2 0 1 1-2.828 2.829L.586 31.698a2 2 0 0 1 0-2.828L28.87.586a2 2 0 1 1 2.828 2.828l-26.87 26.87 26.87 26.87z" fill="#CCC" />
                            </svg>
                        </div>,
                        <div className={styles['slider-btn-next']}>
                            <svg width="33" height="61" viewBox="0 0 33 61" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.698 57.154a2 2 0 1 1-2.828 2.829L.586 31.698a2 2 0 0 1 0-2.828L28.87.586a2 2 0 1 1 2.828 2.828l-26.87 26.87 26.87 26.87z" fill="#CCC" />
                            </svg>
                        </div>
                    ]}
                </div>
            </div>
        }
    }
)
