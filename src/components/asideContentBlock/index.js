import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import md from '../../utils/md'

import styles from './index.scss'

export default withStyles(styles)(
    class extends Component {
        render() {
            const {
                title,
                buttons,
                additionalInformation
            } = this.props;

            return <aside className={styles.content}>
                <div className={styles.inner}>
                    {buttons && buttons.length && <div className={styles.buttons}>
                        <h5>{title}</h5>

                        <div>
                            {buttons
                                .filter(Boolean)
                                .map(([Button, props], index) =>
                                    <Button key={props.id + index} {...props}/>
                                )
                            }
                        </div>
                    </div>}

                    {additionalInformation && <div
                        dangerouslySetInnerHTML={{__html: md.render(additionalInformation)}}
                    />}
                </div>
            </aside>
        }
    }
)
