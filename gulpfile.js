import gulp from "gulp";
import concat from "gulp-concat";
import htmlmin from "gulp-htmlmin";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import babel from "gulp-babel";
import browserSync from "browser-sync";
import { deleteAsync } from "del";
import fs from "fs";

const server = browserSync.create();

// Очистка директории dist
gulp.task("clean", () => {
	return deleteAsync(["dist"]);
});

// Копирование и объединение HTML файлов
gulp.task("html", () => {
	return gulp
		.src("src/sections/*.html")
		.pipe(concat("index.html"))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"))
		.pipe(server.stream());
});

// Объединение и минимизация CSS файлов
gulp.task("css", () => {
	return gulp
		.src("src/styles/*.css")
		.pipe(concat("styles.css"))
		.pipe(cleanCSS())
		.pipe(gulp.dest("dist/css"))
		.pipe(server.stream());
});

// Объединение и минимизация JavaScript файлов
gulp.task("js", () => {
	return gulp
		.src("src/scripts/*.js")
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(concat("scripts.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(server.stream());
});

// Копирование изображений
gulp.task("images", () => {
	return gulp
		.src("public/images/**/*")
		.pipe(gulp.dest("dist/images"))
		.pipe(server.stream());
});

// Запуск сервера разработки с горячей перезагрузкой
gulp.task("serve", () => {
	server.init({
		server: {
			baseDir: "dist",
		},
	});

	gulp.watch("src/sections/*.html", gulp.series("html")).on(
		"change",
		server.reload
	);
	gulp.watch("src/styles/*.css", gulp.series("css")).on(
		"change",
		server.reload
	);
	gulp.watch("src/scripts/*.js", gulp.series("js")).on(
		"change",
		server.reload
	);
	gulp.watch("public/images/**/*", gulp.series("images")).on(
		"change",
		server.reload
	);
});

// Задача по умолчанию
gulp.task(
	"default",
	gulp.series("clean", gulp.parallel("html", "css", "js", "images"), "serve")
);
