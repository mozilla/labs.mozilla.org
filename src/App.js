import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'

import store from './utils/store'

export default class extends React.PureComponent {
    static childContextTypes = {
        insertCss: PropTypes.func.isRequired
    };

    getChildContext() {
        return this.props.context
    }

    render() {
        const context = {
            store
        };

        return <Provider store={store}>
            <div>
                {this.page || null}
                {this.props.children || null}
            </div>
        </Provider>
    }
}
