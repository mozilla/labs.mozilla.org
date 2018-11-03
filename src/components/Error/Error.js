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
            <h1>Error.</h1>
            <a href="/" className="button" data-type="button">back</a>
        </div>
    }
})
