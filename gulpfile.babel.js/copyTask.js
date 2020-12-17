// 拷贝pages目录下的.wxml/.json文件到dist
const gulp = require('gulp');

const { DEST_PAGE_PATH, DEST_PATH, delFile } = require('./common');

const PATH = ['src/app.json', 'src/project.config.json', 'src/sitemap.json'];

const copy = cb => {
  gulp.src(PATH).pipe(gulp.dest('dist'));
  gulp.src('src/components/miniprogram_dist/**').pipe(gulp.dest('dist/components/miniprogram_dist'));
  cb();
}

const watchCopyTask = cb => {
  gulp.watch(PATH, copy).on('unlink', path => delFile(path));
  gulp.watch('src/components/miniprogram_dist/**', copy).on('unlink', path => delFile(path));
  cb();
}

module.exports = [copy, watchCopyTask];
