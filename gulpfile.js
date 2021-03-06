var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var argv = require('yargs').argv;

/*
  Set up env configuration file
*/
gulp.task('config', function() {
  if(argv.env === 'prod')
    return gulp.src('config-production.js').pipe(rename('config.js')).pipe(gulp.dest('scripts/components/shared'));
  else
    return gulp.src('config.js').pipe(gulp.dest('scripts/components/shared'));
});

/*
  Styles Task
*/
gulp.task('sass', function () {
  // Compiles CSS
  gulp.src('./assets/sass/**.scss')
    .pipe(sass({includePaths: ['./assets/sass']}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(reload({stream:true}))
});

/*
  Images
*/
gulp.task('images',function(){
  gulp.src('./assets/images/**')
    .pipe(gulp.dest('./build/assets/images'))
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
  browserSync({
    // we need to disable clicks and forms for when we test multiple rooms
    server : {},
    middleware : [ historyApiFallback() ],
    ghostMode: false
  });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify('./scripts/' + file).transform("babelify")) : browserify('./scripts/' + file).transform("babelify");

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false); // this will once run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['config', 'images','sass','scripts','browser-sync'], function() {
  gulp.watch('./assets/sass/**/*', ['sass']); // gulp watch for stylus changes
  return buildScript('main.js', true); // browserify watch for JS changes
});
