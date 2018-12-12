import React, {Component} from 'react'

export default class extends Component {
    render() {
        const {
            image: {
                title,
                url
            } = {}
        } = this.props;

        return <div>
            <img src={url} alt={title}/>
        </div>
    }
}
