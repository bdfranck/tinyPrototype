"use strict";
if ( typeof require === "undefined" ) { var require = {}; }

var gulp = require("gulp");
var watch = require("gulp-watch");
var rjs = require("gulp-requirejs");

gulp.task("require-build", function(){
 rjs({
    baseUrl: "./assets/js",
    paths: {
      "text": "vendor/text",
      "jquery": "vendor/jquery",
      "knockout": "vendor/knockout",
      "komapping": "vendor/komapping",
      "data": "../../data/prototype.data.json",
      "templates": "../../data/prototype.templates.html"
    },
    name: "main",
    out: "main-built.js"
	})
 	.pipe(gulp.dest("./assets/js/"));
 });

gulp.task("watch", function(){
	watch(["*.html", "./data/*.{json, html}", "./assets/js/main.js"], function(){
		gulp.start("require-build");
	});
});

gulp.task("default", function() {
	gulp.start(["watch"]);
});
