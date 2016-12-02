var gulp = require("gulp"),
		sass = require("gulp-sass"),
		uglify = require("gulp-uglify"),
		pump = require("pump"),
		sourcemaps = require("gulp-sourcemaps"),
		autoprefixer = require("gulp-autoprefixer"),
		browserSync = require("browser-sync").create();

// minify javaSripts
gulp.task("uglify", function (cb) {
	pump([
			gulp.src("dist/builds/js/scripts.js"),
			uglify(),
			gulp.dest("dist/js")
		],
		cb
	)
	.pipe(browserSync.reload({ stream : true })); // livereload
});

// compile sass
// sourcemaps
// automatic browser prefixing
gulp.task("sass", function() {
	return gulp.src("dist/builds/sass/**/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: "expanded"
	}).on("error", sass.logError))
	.pipe(autoprefixer({
		browsers : ["last 6 versions"]
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(browserSync.reload({ stream : true })); // livereload
});

// html
gulp.task("html", function() {
	return gulp.src("*.html")
	.pipe(browserSync.reload({ stream : true })); // livereload
});

// watch
// livereload
gulp.task("watch", function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(["*.html"], ["html"]);
	gulp.watch("dist/builds/sass/**/*.scss", ["sass"]);
	gulp.watch("dist/builds/js/scripts.js", ["uglify"]);
});

gulp.task("default", ["watch"]);
