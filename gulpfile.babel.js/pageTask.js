// 拷贝pages目录下的.wxml/.json文件到dist
const gulp = require('gulp');

const { DEST_PAGE_PATH, DEST_PATH, delFile } = require('./common');

const PATH = ['src/**/*.wxml', 'src/**/*.json', '!src/pages/**/*.wxml', 'src/pages/**/*.json'];

const copyPages = cb => {
  gulp.src('src/pages/**/*.wxml').pipe(gulp.dest(DEST_PAGE_PATH));

  gulp.src('src/pages/**/*.json').pipe(gulp.dest(DEST_PAGE_PATH));

  gulp.src(PATH).pipe(gulp.dest(DEST_PATH));
  cb();
}

const watchPagesTask = cb => {
  gulp.watch(['src/**/*.wxml', 'src/**/*.json'], copyPages).on('unlink', path => delFile(path));
  cb();
}

module.exports = [copyPages, watchPagesTask];
