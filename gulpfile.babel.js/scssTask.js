// 编译src目录下的scss文件
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

const { showError, delFile, DEST_PAGE_PATH, DEST_PATH } = require('./common');

const PAGE_SCSS_PATH = 'src/pages/**/*.scss';

const PATH = ['src/app.scss', 'src/**/*.scss', '!src/pages/**/*.scss'];

const scss = cb => {
  gulp.src(PAGE_SCSS_PATH)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      extname: '.wxss'
    }))
    .on('error', showError)
    .pipe(gulp.dest(DEST_PAGE_PATH));

  gulp.src(PATH)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      extname: '.wxss'
    }))
    .on('error', showError)
    .pipe(gulp.dest(DEST_PATH));
  cb();
}

const watchScssTask = cb => {
  gulp.watch(['src/**/*.scss', 'src/iconfont.wxss'], scss).on('unlink', path => delFile(path));
  cb();
}

module.exports = [scss, watchScssTask];
