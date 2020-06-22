// 压缩、拷贝图片任务
const gulp = require('gulp');
const smushit = require('gulp-smushit');

const { DEST_PATH, delFile } = require('./common');

const PATH = 'src/**/*.{jpe?g,png}';

const imageTask = cb => {
  gulp.src(PATH).pipe(gulp.dest(DEST_PATH));
  cb();
}

const imageBuildTask = cb => {
  gulp.src(PATH)
    .pipe(smushit({
      verbose: true
    }))
    .pipe(gulp.dest(DEST_PATH));
  cb();
}

const watchImageTask = cb => {
  gulp.watch(PATH, imageTask).on('unlink', path => delFile(path));
  cb();
}

module.exports = [imageTask, watchImageTask, imageBuildTask];
