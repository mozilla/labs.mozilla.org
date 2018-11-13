import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.less'

export default withStyles(styles)(class extends Component {
    render() {
        //const {error} = this.props;

        //if(__DEV__ && error) {
        //    return <div>
        //        <h1>{error.name}</h1>
        //        <pre>{error.stack}</pre>
        //    </div>
        //}

        return <div className={styles.container}>
            <div className={styles.text}>
                <h1>Whoops!</h1>

                <ul>
                    <li>If you typed in the address, check your spelling. Could just be a typo.</li>
                    <li>If you’ve found an issue with one of our websites, we’d appreciate it if you could report the problem in Bugzilla, our bug tracker. One of our developers will take a look at it as soon as possible.</li>
                    <li>If you followed a link, it’s probably broken.</li>
                    <li>If you’re not sure what you’re looking for, start at mozilla.org.</li>
                </ul>

                <a href="/" className="button" data-type="button">Back</a>
            </div>
        </div>
    }
})
