import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './index.scss'

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
                description,
                theme,
                numberOfColumns,
                listImageItems,
                button: [Component, props] = []
            } = this.props;

            const grid = numberOfColumns === 3 ? 'three' : numberOfColumns === 2 ? 'two' : 'single';

            return <section className={
                `${styles.content}
                ${theme ? styles[theme] : ''}`
            }>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        {title && <h2>{title}</h2>}
                        {description && <p>{description}</p>}
                    </div>

                    <div className={grid && styles[grid]}>
                        {
                            listImageItems &&
                            listImageItems.length &&
                            listImageItems
                                .filter(Boolean)
                                .map(([Component, props], index) =>
                                    <Component
                                        key={props.id + index}
                                        theme={theme}
                                        grid={grid}
                                        {...props}
                                    />
                                )
                        }
                    </div>

                    {Component && <div className={styles.more}>
                        <Component inverted={theme === 'dark'} {...props}/>
                    </div>}
                </div>
            </section>
        }
    }
)
