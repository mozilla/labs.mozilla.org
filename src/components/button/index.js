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
                url,
                image: {
                    title: logoTitle = '',
                    url: imageUrl = '',
                    details: {
                        image: {
                            width
                        } = {}
                    } = {}
                } = {}
            } = this.props;

            return <a
                href={url}
                alt={title}
                className={styles.button}
            ><img src={imageUrl} alt={title}/></a>
        }
    }
)
