import cp from 'child_process';

import pkg from '../package.json';

import run from './run';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
export default async() => {
    await run(clean);
    await run(copy);
    await run(bundle);

    if(process.argv.includes('--docker')) {
        cp.spawnSync('docker', ['build', '-t', pkg.name, '.'], {
            stdio: 'inherit'
        })
    }
}
