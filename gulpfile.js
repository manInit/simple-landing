const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const gulpif = require('gulp-if');

let isDev = false;
let isProd = !isDev;

const htmlDir = 'src/*.html',
    stylesDir = 'src/styles/**/*.s+(a|c)ss',
    scriptDir = 'src/js/**/*.js',
    imgDir = 'src/img/*',
    mainStyle = 'src/styles/index.scss',
    mainScript = 'src/js/main.js',
    buildDir = 'build';

let webpackConf = {
    output: {
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'none'
};

function html() {
    return gulp.src(htmlDir)
            .pipe(gulp.dest(buildDir))
            .pipe(browserSync.stream());
}

function img() {
    return gulp.src(imgDir)
            .pipe(gulpif(isProd, imagemin()))
            .pipe(gulp.dest(`${buildDir}/img`))
            .pipe(browserSync.stream());
}

function sassStyle() {
    return gulp.src(mainStyle)
            .pipe(gulpif(isDev, sourcemaps.init()))
            .pipe(sass())
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS())
            .pipe(gulpif(isDev, sourcemaps.write()))
            .pipe(gulp.dest(buildDir))
            .pipe(browserSync.stream());
}

function script() {
    return gulp.src(mainScript)
            .pipe(webpack(webpackConf))
            .pipe(gulp.dest(`${buildDir}/js`))
            .pipe(browserSync.stream());
}

function cleanAll() {
    return del(buildDir);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: buildDir
        },
        options: {
            proxy: "mysite.dev"
        }
    });

    gulp.watch(stylesDir, sassStyle);
    gulp.watch(htmlDir, html);
    gulp.watch(imgDir, img);
    gulp.watch(scriptDir, script);
}

gulp.task('build', gulp.series(cleanAll, gulp.parallel(html, sassStyle, img, script)));
gulp.task('serv', gulp.series('build', serve));