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
const closure_not_so_compiler = compiler({
  compilationLevel: 'WHITESPACE_ONLY',
  warningLevel: 'VERBOSE',
  jsOutputFile: 'mapreduce.js'
})

gulp.task('dev-dist', () => {
  return gulp.src('./src/*', {base: './'})
  .pipe(closure_not_so_compiler)
  .pipe(gulp.dest('./dist'))
  .pipe(gulp.dest('./test/dist'));
})

gulp.task('dist', () => {
  return gulp.src('./src/*.js', {base: './'})
  .pipe(closure_compiler)
  .pipe(gulp.dest('./dist'))
  .pipe(gulp.dest('./test/dist'));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint({
    globals: [
      'navigator',
      'navigator.hardwareConcurrency'
    ],
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
  gulp.start(['lint', 'dev-dist', 'dist', 'test'])
  gulp.watch('./src/*',
  ['lint', ['dev-dist', 'dist']])
});
