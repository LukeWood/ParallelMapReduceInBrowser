const gulp = require("gulp")
const compiler = require('google-closure-compiler-js').gulp();


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
