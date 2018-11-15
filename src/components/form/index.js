import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import md from '../../utils/md'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                errorArray: [],
                email: '',
                privacy: false,
                success: false
            };

            this.form = React.createRef(); // #newsletter_form
            this.errors = React.createRef(); // #newsletter_errors
            this.thanks = React.createRef(); // #newsletter_thanks
        }

        componentDidMount() {
            this.setState({
                fmt: this.props.fmt || '',
                newsletters: this.props.newsletters || ''
            })

            window.md = md;

            window.test = this.props.privacyText;
        }

        handleInputChange = event => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
                [name]: value
            });
        };

        newsletterError = () => {
            const {errorArray} = this.state;

            if(!errorArray.length) {
                // no error messages, forward to server for better troubleshooting
                this.form.current.setAttribute('data-skip-xhr', true);
                this.form.current.submit();
            }
        };

        newsletterThanks = () => {
            this.setState({
                success: true
            })
        };

        newsletterSubscribe = evt => {
            const skipXHR = this.form.current.getAttribute('data-skip-xhr');

            if(skipXHR) {
                return true
            }

            evt.preventDefault();
            evt.stopPropagation();

            // clear old errors
            this.setState({
                errors: []
            });

            const fmt = this.props.fmt.trim();
            const newsletter = this.props.newsletters.trim();
            const email = this.state.email;
            const privacy = this.state.privacy ? '&privacy=true' : '';
            const params = `email=${encodeURIComponent(email)}&newsletters=${newsletter}${privacy}&fmt=${fmt}&source_url=${encodeURIComponent(process.env.BROWSER && document ? document.location.href : '')}`;
            const url = this.props.formAction + params;

            if(url) {
                fetch(url, {
                    method: 'POST'
                })
                    .then(response => response.json)
                    .then(data => {
                        this.newsletterThanks();
                    })
                    .catch(err => {
                        console.log('ERROR', err);
                        this.newsletterError(err)
                    })
            }
        };

        render() {
            const {
                title,
                description,
                newsletters = '', // "mozilla-and-you"
                fmt = '', // 'H'
                formAction = '', // "https://www.mozilla.org/en-US/newsletter/"
                button: [Component, props] = [],
                privacyText = '',
                thanksText
            } = this.props;

            return <div className={`${styles.content} ${this.state.success ? styles.success : ''}`}>
                <form
                    method="post"
                    ref={this.form}
                    onSubmit={this.newsletterSubscribe}
                    action={formAction}
                    className={styles.form}
                >

                    <h4>{title}</h4>
                    <p>{description}</p>

                    <input type="hidden" name="fmt" value={fmt}/>
                    <input type="hidden" name="newsletters" value={newsletters}/>

                    {this.state.errorArray.length ? <div ref={this.errors} className={styles.newsletter_errors}>
                        {this.state.errorArray
                            .map(error => <div data-tag="error">{error}</div>)}
                    </div> : null}

                    <div id="newsletter_email" className={styles.form_group}>
                        <label htmlFor="email">
                            <p>Email Address</p>
                            <input
                                id="email" type="email" name="email" placeholder="you@example.com" size="30" required
                                className={styles.form_input}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>

                    <label htmlFor="privacy">
                        <input
                            id="privacy" type="checkbox" name="privacy" required
                            checked={this.state.privacy}
                            onChange={this.handleInputChange}
                        />
                        <span className={styles.checkmark}/>
                        <div dangerouslySetInnerHTML={{__html: md.renderInline(privacyText)}} />
                    </label>

                    <div id="newsletter_submit">
                        <Component type={'submit'} {...props}/>
                    </div>
                </form>

                <div
                    id="newsletter_thanks"
                    ref={this.thanks}
                    className={styles.newsletter_thanks}
                    dangerouslySetInnerHTML={{__html: md.render(thanksText)}}
                />

            </div>
        }
    }
)
