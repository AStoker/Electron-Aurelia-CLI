import gulp from 'gulp';
// import browserSync from 'browser-sync';
// import historyApiFallback from 'connect-history-api-fallback/lib';
import { CLIOptions } from 'aurelia-cli';
import project from '../aurelia.json';
import build from './build';
import watch from './watch';

import * as childProcess from 'child_process';
import * as electron from 'electron';

let serve = gulp.series(
    build,
    done => {
        childProcess
            .spawn('electron', ['.'], {
                stdio: 'inherit'
            })
            .on('close', () => {
                process.exit();
            });
        done();
        // browserSync({
        //     online: false,
        //     open: false,
        //     port: 9000,
        //     logLevel: 'silent',
        //     server: {
        //         baseDir: [project.platform.baseDir],
        //         middleware: [historyApiFallback(), function(req, res, next) {
        //             res.setHeader('Access-Control-Allow-Origin', '*');
        //             next();
        //         }]
        //     }
        // }, function(err, bs) {
        //     if (err) return done(err);
        //     let urls = bs.options.get('urls').toJS();
        //     log(`Application Available At: ${urls.local}`);
        //     log(`BrowserSync Available At: ${urls.ui}`);
        //     done();
        // });
    }
);

function log(message) {
    console.log(message); //eslint-disable-line no-console
}

let run;

if (CLIOptions.hasFlag('watch')) {
    run = gulp.series(
        serve,
        done => {
            watch(() => gulp.series(build));
            done();
        }
    );
} else {
    run = serve;
}

export default run;
