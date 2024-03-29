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

            this.form = React.createRef();
            this.errors = React.createRef();
            this.thanks = React.createRef();
            this.privacy = React.createRef();
        }

        componentDidMount() {
            this.setState({
                fmt: this.props.fmt || '',
                newsletters: this.props.newsletters || ''
            })
        }

        handleInputChange = event => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            if(target.type === 'checkbox' && this.privacy && this.privacy.current) {
                this.privacy.current.classList.remove(styles.privacyError);
            }

            this.setState({
                [name]: value
            });
        };

        newsletterError = () => {
            const {errorArray} = this.state;

            if(!errorArray.length) {
                this.form.current.setAttribute('data-skip-xhr', true);
                this.form.current.submit();
            }
        };

        newsletterThanks = () => {
            this.setState({
                success: true
            })
        };

        privacyError = node => {
            if(node) {
                node.classList.add(styles.privacyError)
            }
        };

        newsletterSubscribe = evt => {
            const skipXHR = this.form.current.getAttribute('data-skip-xhr');

            if(skipXHR) {
                return true
            }

            evt.preventDefault();
            evt.stopPropagation();

            this.setState({
                errors: []
            });

            if(!this.state.privacy) {
                if(this.privacy && this.privacy.current) {
                    this.privacyError(this.privacy.current);
                }

                return
            }

            const fmt = this.props.fmt.trim();
            const newsletter = this.props.newsletters.trim();
            const email = this.state.email;
            const privacy = this.state.privacy ? '&privacy=true' : '';
            const url = this.props.formAction;

            if(!url) {
                return this.newsletterError()
            }

            const  params = 'email=' + encodeURIComponent(email) +
                '&newsletters=' + newsletter +
                privacy +
                '&fmt=' + fmt +
                '&source_url=' + encodeURIComponent(document.location.href);

            const xhr = new XMLHttpRequest();

            xhr.onload = r => {
                if(r.target.status >= 200 && r.target.status < 300) {
                    const response = r.target.response;

                    if (response.success === true) {
                        this.newsletterThanks();
                    }
                    else {
                        if(response.errors) {
                            for(let i = 0; i < response.errors.length; i++) {
                                this.errorArray.push(response.errors[i]);
                            }
                        }
                        this.newsletterError(new Error());
                    }
                } else {
                    this.newsletterError(new Error());
                }
            };

            xhr.onerror = e => {
                this.newsletterError(e);
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
            xhr.timeout = 5000;
            xhr.ontimeout = this.newsletterError;
            xhr.responseType = 'json';
            xhr.send(params);

            return false;
        };

        render() {
            const {
                title,
                formId = 'mozilla-technology',
                description,
                newsletters = '',
                fmt = '',
                formAction = '',
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
                            .map((error, index) => <div key={error + index} data-tag="error">{error}</div>)}
                    </div> : null}

                    <div id={formId} className={styles.form_group}>
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

                    <label
                        htmlFor="privacy"
                        ref={this.privacy}
                    >
                        <input
                            id="privacy" type="checkbox" name="privacy"
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
