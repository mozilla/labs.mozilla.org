import {cleanDir} from './lib/fs';

export default () => Promise.all([
    cleanDir('build/*', {
        nosort: true,
        dot: true,
        ignore: ['build/.git']
    })
])
