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

            if(process.env.BROWSER) {
                document.addEventListener('keydown', this.handleKeyDown, false);
            }
        }

        handleKeyDown = e => {
            if(e.key && e.key === 'Escape') {
                this.closeModal()
            }
        };

        initSwiper = async el => {
            if(!el || this.swiper || this.props.videoCarousel.length < 2) {
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
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                },
                on: {
                    click: e => {
                        let target = e.target;

                        if(target === null) {
                            return
                        }

                        if(!target.classList.contains(`.${styles.slide}`)) {
                            target = target.closest(`.${styles.slide}`)
                        }

                        const index = target.getAttribute('data-index');

                        if(self.swiperModal && self.swiper.slideTo instanceof Function) {
                            self.stopVideo();
                            self.swiperModal.slideTo(index);

                            if(self.swiperModal.el) {
                                const modalSlides = self.swiperModal.el.querySelectorAll(`.${styles.slideM}`);

                                if([...modalSlides][index] !== null) {
                                    self.playVideo([...modalSlides][index]);
                                }
                            }

                            self.setState({
                                visibleModal: true
                            })
                        }
                    }
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
                    // transitionEnd: () => {
                    //     const current = el.querySelector(`.${styles.activeM}`);
                    //
                    //     this.playVideo(current)
                    // },
                    slideChange: () => {
                        this.stopVideo();
                    }
                }
            })
        };

        stopVideo = () => {
            const sliders = [];

            if(this.swiper) {
                sliders.push(document.querySelector(`.${styles.mainSlider}`))
            }

            if(this.swiperModal) {
                sliders.push(document.querySelector(`.${styles.modalSlider}`))
            }

            if(!sliders.length) {
                return
            }

            sliders.forEach(slider => {
                const videos = slider.querySelectorAll('video');

                [...videos].forEach(video => video.pause());
            });
        };

        playVideo = current => {
            if(current !== null) {
                const video = current.querySelector('video');

                if(video !== null) {
                    const playPromise = video.play();

                    if(playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                // console.log('play')
                            })
                            .catch(err => {
                                console.error('playPromise err', err);
                            })
                    }
                }
            }
        };

        componentWillUnmount() {
            if(this.swiper && this.swiper.destroy instanceof Function) {
                this.swiper.destroy(true, false)
            }

            if(this.swiperModal && this.swiperModal.destroy instanceof Function) {
                this.swiperModal.destroy(true, false)
            }

            if(process.env.BROWSER) {
                document.removeEventListener('keydown', this.handleKeyDown)
            }
        }

        closeModal = () => {
            this.stopVideo();

            this.setState({
                visibleModal: false
            });
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
                <section key={`${id}-main-container`} className={styles.content}>
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
                                                data-index={index}
                                                className={styles.slide}
                                                style={{cursor: 'pointer'}}
                                            >
                                                {slidesPerView ? <div className={styles.media}>
                                                    <img
                                                        src={props.image ? props.image.url : props.poster.url}
                                                        alt={props.title}
                                                    />
                                                    {props.poster && props.poster.url ? <div className={styles.playIcon}/> : null}
                                                </div> : <Component {...props}/>}
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
                </section>,
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
                                                data-index={index}
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
