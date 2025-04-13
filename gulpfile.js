const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const clean = require('gulp-clean');

// Очистка папки dist
gulp.task('clean', function() {
  return gulp.src('dist', {read: false, allowEmpty: true}) // allowEmpty чтобы не было ошибки, если папка пуста
    .pipe(clean({force: true})); // force: true для удаления файлов, даже если есть проблемы с правами
});

// Обработка HTML
gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream()); // <--- Важно!
});

// Обработка стилей (Sass)
gulp.task("styles", function () {
  return gulp.src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream()); // <--- Важно!
});

// Обработка JavaScript (просто копирование)
gulp.task("scripts", function () {
  return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream()); // <--- Важно!
});

// Копирование шрифтов
gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream()); // <--- Важно!
});

// Копирование иконок
gulp.task("icons", function () {
  return gulp.src("src/icons/**/*")
    .pipe(gulp.dest("dist/icons"))
    .pipe(browserSync.stream()); // <--- Важно!
});

// Копирование изображений
gulp.task("images", function () {
  return gulp.src("src/img/**/*")
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream()); // <--- Важно!
});

gulp.task("food", function () {
  return gulp.src("src/food/**/*")
    .pipe(gulp.dest("dist/food"))
    .pipe(browserSync.stream()); // <--- Важно!
});

// Запуск сервера разработки и отслеживание изменений
gulp.task("watch", function () {
  gulp.watch("src/*.html", gulp.series("html")); // Следим за HTML
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series("styles")); // Следим за SCSS
  gulp.watch("src/js/**/*.js", gulp.series("scripts")); // Следим за JS
  gulp.watch("src/fonts/**/*", gulp.series("fonts")); // Следим за шрифтами
  gulp.watch("src/icons/**/*", gulp.series("icons")); // Следим за иконками
  gulp.watch("src/img/**/*", gulp.series("images"));
  gulp.watch("src/food/**/*", gulp.series("food"));
});

gulp.task("server", function (done) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    port: 3000,
    notify: false,
    open: true,
  });
  done(); // Добавляем вызов done() для завершения асинхронной задачи
});

// Задача по умолчанию
gulp.task(
  "default",
  gulp.series(
    'clean', // Сначала очищаем папку dist
    gulp.parallel(
      "html",
      "styles",
      "scripts",
      "fonts",
      "icons",
      "images",
      "food"
    ),
    "server",
    "watch"
  )
);
