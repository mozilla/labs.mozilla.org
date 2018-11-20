import React, {Component} from 'react'
import Swiper from 'swiper/dist/js/swiper.min'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

const PrevButton = () =>
    <svg width="33" height="61" viewBox="0 0 33 61" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M31.698 57.154a2 2 0 1 1-2.828 2.829L.586 31.698a2 2 0 0 1 0-2.828L28.87.586a2 2 0 1 1 2.828 2.828l-26.87 26.87 26.87 26.87z"
            fill="#CCC"/>
    </svg>;

const NextButton = () =>
    <svg width="33" height="61" viewBox="0 0 33 61" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M31.698 57.154a2 2 0 1 1-2.828 2.829L.586 31.698a2 2 0 0 1 0-2.828L28.87.586a2 2 0 1 1 2.828 2.828l-26.87 26.87 26.87 26.87z"
            fill="#CCC"/>
    </svg>;


export default withStyles(styles)(
    class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                visibleModal: false
            }
        }

        static defaultProps = {
            onRef() {
            }
        };

        componentDidMount() {
            this.props.onRef(this);
        }

        initSwiper = async el => {
            // if(this.props.videoCarousel && !this.props.videoCaraousel.length) {}
            if (!el || this.swiper) {
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
                slidesPerView: this.props.slidesPerView ? 2 : 1,
                spaceBetween: 30,
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


        initModalSwiper = async el => {
            // if(this.props.videoCarousel && !this.props.videoCaraousel.length) {}
            if(!el || this.swiperModal) {
                return
            }

            const self = this;

            self.swiperModal = new Swiper(el, {
                direction: 'horizontal',
                wrapperClass: styles.wrapperM,
                slideClass: styles.slideM,
                slideActiveClass: styles.activeM,
                slideNextClass: styles.nextM,
                slidePrevClass: styles.prevM,
                slideToClickedSlide: false,
                slideVisibleClass: styles.slideVisibleClassM,
                slidesPerView: 1,
                pagination: {
                    el: `.${styles['slider-paginationM']}`,
                    clickable: true,
                    bulletClass: styles.bulletM,
                    bulletActiveClass: styles.activeM
                },
                navigation: {
                    prevEl: `.${styles['slider-btn-prevM']}`,
                    nextEl: `.${styles['slider-btn-nextM']}`,
                    disabledClass: styles.disabledM
                },
                on: {
                    transitionEnd: e => {
                        const current = el.querySelector(`.${styles.activeM}`);

                        this.playVideo(current)
                    },
                    slideChange: e => {
                        const slides = el.querySelectorAll(`.${styles.slide}`);

                        this.stopVideo(slides);
                    }
                }
            })
        };

        stopVideo = (nodes) => {
            const slides = [...nodes];

            if(slides && slides.length) {
                slides.forEach(slide => {
                    const video = slide.querySelector('video');

                    if(video !== null) {
                        video.pause();
                    }
                })
            }
        };

        playVideo = current => {
            if(current !== null) {
                const video = current.querySelector('video');

                if(video !== null) {
                    const playPromise = video.play();

                    playPromise
                        .then(() => {
                            // console.log('play')
                        })
                        .catch(err => {
                            console.log('playPriomise err', err);
                        })
                }
            }
        };

        componentWillUnmount() {
            if(this.swiper && this.swiper.destroy instanceof Function) {
                // TODO: test
                this.swiper.destroy(true, false)
            }

            if(this.swiperModal && this.swiperModal.destroy instanceof Function) {
                // TODO: test
                this.swiperModal.destroy(true, false)
            }
        }

        selectSlide = (event, index) => {
            if(!this.props.slidesPerView) {
                return;
            }

            this.setState({
                visibleModal: true
            });
        };

        closeModal = e => {
            const target = e.target;

            if(target.classList.contains(styles.closeButton) || target.classList.contains(styles.overlay)) {
                this.setState({
                    visibleModal: false
                });
            }
        };

        render() {
            const {
                id,
                title,
                description,
                videoCarousel,
                slidesPerView
            } = this.props;

            return [
                <div key={`${id}-main-container`} className={styles.content}>
                    <div className={styles.inner}>
                        <div className={styles.text}>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>

                        <div className={styles.mainSlider}>
                            {videoCarousel && videoCarousel.length && <div
                                ref={this.initSwiper}
                                className={styles.container}
                            >
                                <div className={styles.wrapper}>
                                    {videoCarousel
                                        .filter(Boolean)
                                        .map(([Component, props], index) =>
                                            <div
                                                key={props.id + index}
                                                className={styles.slide}
                                                onClick={e => this.selectSlide(e, index)}
                                                style={{cursor: 'pointer'}}
                                            >
                                                {slidesPerView ? <img
                                                    src={props.image ? props.image.url : props.poster.url}
                                                    alt={props.title}
                                                /> : <Component {...props}/>}
                                            </div>
                                        )}
                                </div>
                            </div>}

                            {videoCarousel && videoCarousel.length > 1 && [
                                <div key={`${id}-sp`} className={styles['slider-pagination']}/>,

                                <div key={`${id}-bp`} className={styles['slider-btn-prev']}>
                                    <PrevButton/>
                                </div>,
                                <div key={`${id}-bn`} className={styles['slider-btn-next']}>
                                    <NextButton/>
                                </div>
                            ]}
                        </div>
                    </div>
                </div>,
                <div
                    key={`${id}-modal-container`}
                    className={`${styles.modalSlider} ${this.state.visibleModal ? styles.visibleModal : ''}`}
                >
                    <div
                        onClick={this.closeModal}
                        className={styles.overlay}
                    />
                    {slidesPerView && <div className={styles.modalInner}>
                        <div className={styles.modalContent}>
                            <button
                                onClick={this.closeModal}
                                className={styles.closeButton}
                            >Close</button>

                            {videoCarousel && videoCarousel.length && <div
                                ref={this.initModalSwiper}
                                className={`${styles.container} ${styles.containerM}`}
                            >
                                <div className={`${styles.wrapper} ${styles.wrapperM}`}>
                                    {videoCarousel
                                        .filter(Boolean)
                                        .map(([Component, props], index) =>
                                            <div
                                                key={props.id + index}
                                                className={`${styles.slide} ${styles.slideM}`}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <Component {...props}/>
                                            </div>
                                        )}
                                </div>
                            </div>}

                            <div key={`${id}-spm`} className={`${styles['slider-pagination']} ${styles['slider-paginationM']}`}/>

                            <div key={`${id}-bpm`} className={`${styles['slider-btn-prev']} ${styles['slider-btn-prevM']}`}>
                                <PrevButton/>
                            </div>
                            <div key={`${id}-bnm`} className={`${styles['slider-btn-next']} ${styles['slider-btn-nextM']}`}>
                                <NextButton/>
                            </div>
                        </div>
                    </div>}
                </div>]
        }
    }
)
