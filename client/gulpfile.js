const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/styles"));
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
});
