var gulp = require('gulp')
var moment = require('moment')

function info(msg){
  console.log(['**', moment().format('h:mm:ss'), msg, '**'].join(' '))
}

gulp.task('view', function(){
  var pug = require('gulp-pug')
  var combiner = require('stream-combiner2')
  gulp.watch('src/views/*.pug', function(){
      info('compile views')
      var combined = combiner.obj([
          gulp.src('src/views/*.pug')
          , pug()
          , gulp.dest('dist/views/')
      ])
      combined.on('error', console.error.bind(console))
  })
})

gulp.task('prettify', function(){
  var prettify = require('gulp-html-prettify')
  gulp.src('./dist/views/*.html')	
      .pipe(prettify())
      .pipe(gulp.dest('./dist/'))
})

gulp.task('script', function() {
  var compiler = require('google-closure-compiler-js').gulp()
  gulp.watch('./src/scripts/*.js', function(){
    info('compile js')
    gulp.src('./src/scripts/*.js', {base: './'})
        .pipe(compiler({
            compilationLevel: 'WHITESPACE_ONLY',
            warningLevel: 'VERBOSE',
            languageIn: 'ECMASCRIPT6',
            languageOut: 'ECMASCRIPT5',
            outputWrapper: '(function(){\n%output%\n}).call(this)',
            jsOutputFile: 'output.min.js',  // outputs single file
            createSourceMap: true
          }))
        .pipe(gulp.dest('./dist/scripts/'));
  })
})


gulp.task('css', function () {
  var postcss    = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  gulp.watch('./src/styles/*.css', function(){
    info('compile css')
    gulp.src('src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([require('postcss-cssnext')]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles/'))
  })
});
