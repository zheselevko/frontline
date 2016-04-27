var gulp = require('gulp');
var rimraf = require('rimraf');
var gutil = require('gulp-util');
var ftp = require( 'vinyl-ftp' );
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'html:watch',
    'font:watch',
    'js:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});

/** Configuration **/
var user = 'zheselevko_front';  
var password = 'xoxol22s';  
var host = 'madmax.beget.com';  
var port = 21;  
var localFilesGlob = ['build/**/*'];  
var remoteFolder = '/';

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}
/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function() {

    var conn = getFtpConnection();

    gulp.watch(localFilesGlob)
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

      return gulp.src( [event.path], { base: '.', buffer: false } )
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
      ;
    });
});
gulp.task('default', ['server', 'watch','ftp-deploy'], function() {});
gulp.task('build', ['html','font','sprite','copy','js','sass','ftp-deploy-watch'], function() {});