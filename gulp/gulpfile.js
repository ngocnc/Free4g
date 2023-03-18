const gulp        = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const { watch, series } = require('gulp');

const paths = {
  scripts: {
    src: './',
    dest: '../'
  }
};

// Reload Server
async function reload() {
  server.reload();
}

async function includeHTML(){
    return gulp.src([
      'page/**/*.html',
      '!layout/**/*.html', // ignore
      '!import/**/*.html'
      // using ignore to render the dest, then use exclamation mark !
      ])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(paths.scripts.dest));
  }

  async function buildAndReload() {
    await includeHTML();
    reload();
  }

  // exports.includeHTML = includeHTML;

  exports.default = async function() {
    server.init({
      server: {
        baseDir: paths.scripts.dest
      }
    });
    buildAndReload();

    // every html file changed then run this function
    watch(["./**/*.html","../assets/**/*.css","../assets/**/main.js"], series(buildAndReload));
  }