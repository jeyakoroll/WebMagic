var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var path_js_files = [
    './js/main.js'
];

var path_css_files = [
    './style/main.scss'
]

gulp.task('dev_compress_js', function (cb) {
  pump([
        gulp.src( path_js_files ),
        sourcemaps.init(),
        // uglify({'mangle': false}),
        concat('main.min.js'),
        sourcemaps.write(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

gulp.task('prod_compress_js', function (cb) {
  pump([
        gulp.src( path_js_files ),
        uglify({'mangle': false}),
        concat('main.min.js'),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

gulp.task('dev_concat_css', function () {
    return gulp.src(path_css_files)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(concatCss("all.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./style/'));
});

gulp.task('prod_minify_css', function () {
    gulp.src(path_css_files)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("all.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('./style/'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir:'./'
        }
    });
});
gulp.watch(path_js_files,[ 'dev_compress_js']).on('change', function(){
    setTimeout(function(){
        browserSync.reload();
    },200);
});
gulp.watch(path_css_files,[ 'dev_concat_css']).on('change', function(){
    setTimeout(function(){
        browserSync.reload();
    },200);
});


gulp.task('dev', ['dev_compress_js', 'dev_concat_css', 'browser-sync']);
gulp.task('production', ['prod_compress_js', 'prod_minify_css']);
