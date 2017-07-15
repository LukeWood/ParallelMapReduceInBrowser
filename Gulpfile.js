const gulp = require("gulp")
const compiler = require('google-closure-compiler-js').gulp();
const eslint = require("gulp-eslint");

const closure_compiler = compiler({
  compilationLevel: 'SIMPLE',
  warningLevel: 'VERBOSE',
  jsOutputFile: 'mapreduce.min.js'
});

gulp.task('build', () => {
  return gulp.src('./srcs/', {base: './'})
  .pipe(gulp.dest('./dist'))
  .pipe(closure_compiler)
  .pipe(gulp.dest('./dist'))
});

gulp.task('develop', () => {
  gulp.watch(["./src/*", "./development/*"], () => {

  })
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
