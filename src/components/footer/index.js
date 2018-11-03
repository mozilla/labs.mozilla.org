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
                copyright,
                buttonsBlock,
                links,
                linksBlock,
                logo: {
                    title,
                    url,
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            return <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        <p>footer</p>
                    </div>

                    <img src={url} alt={title}/>

                    <p>{copyright}</p>


                    {links && links.length && links
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component key={props.id + index} {...props}/>
                        )}

                    {linksBlock && linksBlock.length && linksBlock
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component key={props.id + index} {...props}/>
                        )}

                    {buttonsBlock && buttonsBlock.length && buttonsBlock
                        .filter(Boolean)
                        .map(([Component, props], index) =>
                            <Component key={props.id + index} {...props}/>
                        )}
                </div>
            </div>
        }
    }
)
