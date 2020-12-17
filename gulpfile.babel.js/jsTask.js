// 编译处理src下的js文件
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');

const { showError, delFile, DEST_PAGE_PATH, DEST_PATH } = require('./common');

const javascript = cb => {
  // 编译src/pages下的js
  gulp.src('src/pages/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', showError)
    .pipe(babel())
    .on('error', showError)
    .pipe(gulp.dest(DEST_PAGE_PATH));

  gulp.src(['src/app.js', 'src/**/*.js', '!src/pages/**/*.js', 'src/components/miniprogram_dist/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', showError)
    .pipe(babel())
    .on('error', showError)
    .pipe(gulp.dest(DEST_PATH));
  cb();
}

const watchJsTask = cb => {
  gulp.watch(['src/app.js', 'src/**/*.js'], javascript).on('unlink', path => delFile(path));
  cb();
}

module.exports = [javascript, watchJsTask];
