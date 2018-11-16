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
        const {
            description = '',
            asideBlock: [AsideContentBlock, props] = []
        } = this.props;

        return <section className={`${styles.content} ${AsideContentBlock ? styles.aside : ''}`}>
            <div
                className={styles.inner}
                dangerouslySetInnerHTML={{__html: md.render(description)}}
            />

            {AsideContentBlock && <AsideContentBlock {...props}/>}
        </section>
    }
})
