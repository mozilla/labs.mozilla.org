import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import md from '../../utils/md'

import styles from './index.scss'

export default withStyles(styles)(class extends Component {
    static defaultProps = {
        onRef() {}
    };

    componentDidMount() {
        this.props.onRef(this)
    }

    render() {
        const {description = ''} = this.props;

        return <section className={styles.content}>
            <div
                className={styles.inner}
                dangerouslySetInnerHTML={{__html: md.render(description)}}
            />
        </section>
    }
})
