'use strict';

/*
gulp
- The streaming build system
- https://yarnpkg.com/en/package/gulp

gulp_uglify
- Minify JavaScript with UglifyJS3.
- https://www.npmjs.com/package/gulp-uglify

gulp-sass
- Sass plugin for Gulp.
- https://yarnpkg.com/en/package/gulp-sass

gulp-cssmin
- minify css using gulp.
- https://yarnpkg.com/en/package/gulp-rename

gulp-rename
- gulp-rename is a gulp plugin to rename files easily.
- https://www.npmjs.com/package/gulp-rename

gulp-concat
- Concatenates files
- https://yarnpkg.com/en/package/gulp-concat

gulp-htmlmin
- gulp plugin to minify HTML.
- https://yarnpkg.com/en/package/gulp-htmlmin

gulp-sourcemaps
- Inline source maps are embedded in the source file.
- All plugins between sourcemaps.init() and sourcemaps.write() need to have support for gulp-sourcemaps.
- To write external source map files, pass a path relative to the destination to sourcemaps.write().
- https://yarnpkg.com/en/package/gulp-sourcemaps

gulp-imagemin
- Minify PNG, JPEG, GIF and SVG images with imagemin
- https://yarnpkg.com/en/package/gulp-imagemin

make-dir
- Make a directory and its parents if needed - Think mkdir -p
- https://yarnpkg.com/en/package/make-dir

browser-sync
- Live CSS Reload & Browser Syncing
- https://yarnpkg.com/en/package/browser-sync
*/

var gulp        = require('gulp'),
 	gulp_uglify	= require('gulp-uglify'),
 	gulp_sass	= require('gulp-sass'),
	gulp_cssmin = require('gulp-cssmin'),
	gulp_rename = require('gulp-rename'),
 	gulp_concat	= require('gulp-concat'),
	gulp_htmlmin = require('gulp-htmlmin'),
	gulp_sourcemaps	= require('gulp-sourcemaps'),
	gulp_imagemin 	= require('gulp-imagemin'),
	make_dir 		= require('make-dir'),
	browserSync 	= require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
			// server all files in 'dist' directory
            baseDir: "./dist"
        }
    });
});

gulp.task('make-dir', function(){
	// create these directory in the 'dist' directory
	Promise.all([
	    make_dir('dist/css'),
	    make_dir('dist/js'),
		make_dir('dist/fonts'),
		make_dir('dist/images')])
	.then(paths => {
		// displays the created directory
	    console.log(paths);
	});
});

gulp.task('build-html', function() {
	gulp.src('src/*.html')
		.pipe(gulp_htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build-js', function(){
	/*
	- copy custom, JQuery and UIKit js to 'dist/js/'
	- source map will be generated
	- both create non-min and min file of script.js
	*/

	// create non-minified
	gulp.src([
		   'src/js/*.js',
		   'node_modules/uikit/vendor/jquery.js',
		   'node_modules/uikit/dist/js/uikit.js'])
	   .pipe(gulp_sourcemaps.init())
	   .pipe(gulp_concat('script.js'))
	   .pipe(gulp_sourcemaps.write('./'))
	   .pipe(gulp.dest('dist/js/'));

    // create minified
	gulp.src([
			'src/js/*.js',
			'node_modules/uikit/vendor/jquery.js',
			'node_modules/uikit/dist/js/uikit.js'])
		.pipe(gulp_sourcemaps.init())
		.pipe(gulp_uglify())
		.pipe(gulp_concat('script.js'))
		.pipe(gulp_rename({suffix: '.min'}))
		.pipe(gulp_sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('build-sass', function(){
	/*
	- copy scss to 'dist/css/'
	- source map will be generated
	- both create non-min and min file of style.scss
	*/

	// create non-minified
	gulp.src('src/sass/style.scss')
		.pipe(gulp_sourcemaps.init())
		.pipe(gulp_sass().on('error', gulp_sass.logError))
		.pipe(gulp_concat('style.css'))
		.pipe(gulp_sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css/'));

	// create minified
	gulp.src('src/sass/style.scss')
		.pipe(gulp_sourcemaps.init())
		.pipe(gulp_sass().on('error', gulp_sass.logError))
		.pipe(gulp_concat('style.css'))
		.pipe(gulp_cssmin())
		.pipe(gulp_rename({suffix: '.min'}))
		.pipe(gulp_sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('build-fonts', function(){
	// copy 'fonts' to 'build/fonts'
	gulp.src([
			'node_modules/uikit/dist/fonts/fontawesome-webfont.ttf',
			'node_modules/uikit/dist/fonts/fontawesome-webfont.woff',
			'node_modules/uikit/dist/fonts/fontawesome-webfont.woff2',
			'node_modules/uikit/dist/fonts/FontAwesome.otf'])
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('build-images', function() {
	gulp.src('src/images/*')
		.pipe(gulp_imagemin())
		.pipe(gulp.dest('dist/images'));
});

gulp.task('build', [
	'make-dir',
	'build-html',
	'build-js',
	'build-sass',
	'build-fonts',
	'build-images']
);

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('src/sass/**/*.scss', 	['build-sass']).on('change', browserSync.reload);
	gulp.watch('src/js/*.js', 			['build-js']).on('change', browserSync.reload);
	gulp.watch('src/*.html', 			['build-html']).on('change', browserSync.reload);
});
