const gulp = require('gulp');
const del = require('del');

const jsTask = require('./jsTask');
const scssTask = require('./scssTask');
const pageTask = require('./pageTask');
const copyTask = require('./copyTask');
const imageTask = require('./imageTask');

const clean = cb => del('dist');

exports.build = gulp.series(clean, pageTask[0], scssTask[0], jsTask[0], imageTask[2], copyTask[0]);
exports.default = gulp.series(clean, pageTask, scssTask, jsTask, imageTask[0], imageTask[1], copyTask);
