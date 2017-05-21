// Load our plugins
var	gulp			 = require('gulp'),
	sass			   = require('gulp-sass'),  // Our sass compiler
	webpack      = require('webpack-stream'),
	named				 = require('vinyl-named'),
	notify			 = require('gulp-notify'), // Basic gulp notificatin using OS
	sourcemaps	 = require('gulp-sourcemaps'), // Sass sourcemaps
	autoprefixer = require('gulp-autoprefixer'), // Adds vendor prefixes for us
	size			   = require('gulp-size'),
	browserSync	 = require('browser-sync'), // Sends php, js, and css updates to browser for us
	concat			 = require('gulp-concat'), // Concat our js
	uglify			 = require('gulp-uglify'),
	babel			   = require('gulp-babel'),
	del			     = require('del');


////////////////////////////////////////////////////////////////////////////////
// Path Configs
////////////////////////////////////////////////////////////////////////////////

var paths = {
	sassPath: 'assets/sass/',
	nodePath: 'node_modules/',
	jsPath: 'assets/js/',
	destPath: 'assets/dist/',
	foundationJSpath: 'node_modules/foundation-sites/js/',
	imgPath: 'assets/images/'
};

var bsProxy = 'static.dev';


////////////////////////////////////////////////////////////////////////////////
// Our browser-sync task
////////////////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
	var files = [
		'**/*.php'
	];

	browserSync.init(files, {
		proxy: bsProxy
	});
});


////////////////////////////////////////////////////////////////////////////////
// Styles - Sass
////////////////////////////////////////////////////////////////////////////////

gulp.task('styles', function() {
	gulp.src(paths.sassPath + '**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		})
		.on('error', notify.onError(function(error) {
			return "Error: " + error.message;
		}))
		)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(size({showFiles: true}))
		.pipe(gulp.dest(paths.destPath + 'css')) // Location of our app.css file
		.pipe(browserSync.stream({match: '**/*.css'}))
		.pipe(notify({
			message: "✔︎ Styles task complete",
			onLast: true
		}));
});


////////////////////////////////////////////////////////////////////////////////
// JS
////////////////////////////////////////////////////////////////////////////////

gulp.task('js', function() {
	return gulp.src(paths.jsPath + '*.js')
		.pipe(named())
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(paths.destPath + 'js'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({ message: "✔︎ Scripts task complete!"}));
});


////////////////////////////////////////////////////////////////////////////////
// Foundation JS task, which gives us flexibility to choose what plugins we want
////////////////////////////////////////////////////////////////////////////////

gulp.task('foundation-js', function() {
	return gulp.src([

		/* Choose what JS Plugin you'd like to use. Note that some plugins also
		require specific utility libraries that ship with Foundation—refer to a
		plugin's documentation to find out which plugins require what, and see
		the Foundation's JavaScript page for more information.
		http://foundation.zurb.com/sites/docs/javascript.html */

		// Core Foundation - needed when choosing plugins ala carte
		paths.foundationJSpath + 'foundation.core.js',
		paths.foundationJSpath + 'foundation.util.mediaQuery.js',

		// Choose the individual plugins you want in your project
		paths.foundationJSpath + 'foundation.abide.js',
		paths.foundationJSpath + 'foundation.accordion.js',
		paths.foundationJSpath + 'foundation.accordionMenu.js',
		paths.foundationJSpath + 'foundation.drilldown.js',
		paths.foundationJSpath + 'foundation.dropdown.js',
		paths.foundationJSpath + 'foundation.dropdownMenu.js',
		paths.foundationJSpath + 'foundation.equalizer.js',
		paths.foundationJSpath + 'foundation.interchange.js',
		paths.foundationJSpath + 'foundation.magellan.js',
		paths.foundationJSpath + 'foundation.offcanvas.js',
		paths.foundationJSpath + 'foundation.orbit.js',
		paths.foundationJSpath + 'foundation.responsiveMenu.js',
		paths.foundationJSpath + 'foundation.responsiveToggle.js',
		paths.foundationJSpath + 'foundation.reveal.js',
		paths.foundationJSpath + 'foundation.slider.js',
		paths.foundationJSpath + 'foundation.sticky.js',
		paths.foundationJSpath + 'foundation.tabs.js',
		paths.foundationJSpath + 'foundation.toggler.js',
		paths.foundationJSpath + 'foundation.tooltip.js',
		paths.foundationJSpath + 'foundation.zf.responsiveAccordionTabs.js',
		paths.foundationJSpath + 'foundation.util.box.js',
		paths.foundationJSpath + 'foundation.util.keyboard.js',
		paths.foundationJSpath + 'foundation.util.motion.js',
		paths.foundationJSpath + 'foundation.util.nest.js',
		paths.foundationJSpath + 'foundation.util.timerAndImageLoader.js',
		paths.foundationJSpath + 'foundation.util.touch.js',
		paths.foundationJSpath + 'foundation.util.triggers.js',

	])
	.pipe(babel({
		presets: ['es2015'],
		compact: true
	}))
	.pipe(concat('foundation.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.destPath + 'js'));
});


////////////////////////////////////////////////////////////////////////////////
// Watch our files and fire off a task when something changes
////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
	gulp.watch(paths.sassPath + '**/*.scss', ['styles']);
	gulp.watch(paths.jsPath + '**/*.js', ['js']);
});


// Our default gulp task, which runs all of our tasks upon typing in 'gulp' in Terminal
gulp.task('default', ['styles', 'js', 'browser-sync', 'foundation-js', 'watch']);
