const gulp = require("gulp");
const gulpSequence = require('gulp-sequence');
const compiler = require('google-closure-compiler-js').gulp();
const eslint = require("gulp-eslint");
const webserver = require('gulp-webserver');
const closure_compiler = compiler({
  compilationLevel: 'SIMPLE',
  warningLevel: 'VERBOSE',
  jsOutputFile: 'mapreduce.min.js'
});

gulp.task('dist', () => {
  return gulp.src('./src/*.js', {base: './'})
  .pipe(closure_compiler)
  .pipe(gulp.dest('./dist'))
  .pipe(gulp.dest('./test/dist'));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint({
    globals: [],
    envs: [
      'browsers'
    ],
    fix: true
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  gulp.src('test')
  .pipe(webserver({
    open:true,
    livereload:true
  }));
});

gulp.task('develop', () => {
  return gulp.watch('src/*',
  ['lint', 'dist', 'test'])
});
