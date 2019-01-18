'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const short = require('postcss-short');
const assets = require('postcss-assets');
const Import = require('postcss-import');
const importcss = require('postcss-smart-import');
const cssnext = require('cssnext');
const mqpacker = require("css-mqpacker");
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const jsonlint = require('gulp-jsonlint');
const debug = require('gulp-debug');
const htmlbeautify = require('gulp-html-beautify');
const prettify = require('gulp-html-prettify');

// Clean =================================
gulp.task('clean', function() { 
	return del('build/*');
});

// Pages =================================
gulp.task('pug', function() {
	return gulp.src('./src/pug/*.pug')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(changed('build', {hasChanged: changed.compareContents}))
        // .pipe(reporter())
        .pipe(debug({ title: 'pug:' }))
		.pipe(pug({pretty: true}))  //с переносом pretty: true
        .pipe(gulp.dest('build'))
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////optimized by katleta////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

// gulp.task('html', function() {
//     var options = {
//         "break_chained_methods": true,
//         "end_with_newline": false
//     }
//     return gulp.src('./build/*.html')
//         .pipe(htmlbeautify(options))
//         .pipe(prettify({indent_char: ' ', indent_size: 4}))
//         .pipe(gulp.dest('build'))
// });

// Css =====================================

gulp.task('styles:vendor', function() {
    return gulp.src('./src/styles/vendorCss/*.css')
        .pipe(debug({ title: 'vendorCSS:' }))
        .pipe(gulp.dest('./build/css/vendorCss/'))
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////optimized by katleta////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

gulp.task('styles', function () {
    var processors = [
    	Import,
        autoprefixer({browsers: ['last 1 version']}),
    	cssnext({
    		'customProperties': true,
    		'customFunction': true,
    		'customSelectors': true,
    	}),
    	//cssnano(),
    	nested,
    	short,
    	assets({
    		loadPaths: ['src/assets/fonts/**/*', 'src/assets/images/**/*'],
    		relativeTo: 'src/styles/'
    	}),
        mqpacker({
            sort: true
        })
    ];
    return gulp.src('./src/styles/style.css')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(debug({ title: 'Styles:' }))
        .pipe(postcss(processors))
        .pipe(rename('styles.css')) // как называется новый файл
        .pipe(gulp.dest('./build/css/')) // куда его положить
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////optimized by katleta////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

// Scripts =================================
gulp.task('js', function() {
    return gulp.src('./src/scripts/**/*')
    	// .pipe(concat('min.js'))
        .pipe(debug({ title: 'JavaScript:' }))
        .pipe(gulp.dest('build/js/'))
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////optimized by katleta////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

// Fonts =================================
gulp.task('fonts', function() {
	return gulp.src('./src/assets/fonts/**/*')
        .pipe(debug({ title: 'fonts:' }))
        .pipe(gulp.dest('build/assets/fonts/'))
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////optimized by katleta////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

// Source =================================
gulp.task('source', function() {
    return gulp.src('./src/source/**/*')
        .pipe(debug({ title: 'source:' }))
        .pipe(gulp.dest('build/source/'))
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////optimized by katleta////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

// JSON_Lint =================================
gulp.task('jsonLint', function() {
    return gulp.src('./src/source/**/*.json')
        // .pipe(plumber({ errorHandler: notify.onError()}))
        .pipe(debug({ title: 'JSONLint:' }))
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

// Images =================================
gulp.task('img', function() {
	return gulp.src('./src/assets/images/**/*')
        .pipe(debug({ title: 'images:' }))
		.pipe(imagemin())
        .pipe(gulp.dest('build/assets/images/'))
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////optimized by katleta////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        .on('finish', browserSync.reload)
});

// Watch =================================
gulp.task('watch', function() {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	// gulp.watch('src/pug/**/*.pug', gulp.series('html'));
    gulp.watch('src/styles/**/*.css', gulp.series('styles'));
	gulp.watch('src/styles/vendorCss/*.css', gulp.series('styles:vendor'));
	gulp.watch('src/scripts/**/*.js', gulp.series('js'));
	gulp.watch('src/assets/fonts/**/*', gulp.series('fonts'));
    gulp.watch('src/assets/images/**/*', gulp.series('img'));
	gulp.watch('src/source/**/*', gulp.series('source'));
});

gulp.task('watcher', function() {
    var watcher = gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    var timeout = setTimeout(watcher.end, 60*60*1000);

    watcher.on('change', function() {
        clearTimeout(timeout);
        timeout = setTimeout(watcher.end, 60*60*1000);
    });
});

// Build =================================
gulp.task('build', gulp.series(
    'clean', 
    gulp.parallel('pug', 'styles', 'styles:vendor', 'js', 'fonts', 'img', 'source', 'jsonLint'))
);

// Server =================================
gulp.task('serve', function() {
    browserSync.init({
        injectChanges: true,
        server: './build'
    });

    // browserSync.watch('build').on('change', function(){
    //     console.log('changed')
    // });
})

gulp.task('dev', 
	gulp.series('build', gulp.parallel('watch', 'serve'))
);

// Default ----------------------------------------
gulp.task('default',
    gulp.series(gulp.parallel('watch', 'serve'))
);
