import webpack from 'webpack';

import webpackConfig from './webpack.config';

/**
 * Creates application bundles from the source files.
 */
export default function() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((err, stats) => {
            if(err) {
                return reject(err)
            }

            const FIRST_ELEMENT = 0;

            console.info(stats.toString(webpackConfig[FIRST_ELEMENT].stats));

            return resolve()
        })
    })
}
