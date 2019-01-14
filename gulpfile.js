var gulp = require("gulp"),
  debug = require("gulp-debug"),
  msbuild = require("gulp-msbuild"),
  // source = require('vinyl-source-stream'),
  // buffer = require('vinyl-buffer'),
  // sourcemaps = require('gulp-sourcemaps'),
  // babelify = require('babelify'),
  minifyCss = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  assemblyInfo = require("gulp-dotnet-assembly-info"),
  // plumber = require('gulp-plumber'),
  config = require("./package.json"),
  zip = require("gulp-zip"),
  filter = require("gulp-filter"),
  merge = require("merge2"),
  gutil = require("gulp-util"),
  markdown = require("gulp-markdown"),
  rename = require("gulp-rename"),
  manifest = require("gulp-dnn-manifest"),
  path = require("path"),
  concat = require("gulp-concat"),
  less = require("gulp-less"),
  lessPluginCleanCSS = require("less-plugin-clean-css"),
  cleancss = new lessPluginCleanCSS({
    advanced: true
  });

gulp.task("less", function() {
  return gulp
    .src("css/src/less/module.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
        plugins: [cleancss]
      })
    )
    .pipe(gulp.dest("css/src"));
});

gulp.task("css", ["less"], function() {
  gulp
    .src("node_modules/bootstrap/less/bootstrap.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
        plugins: [cleancss]
      })
    )
    .pipe(rename("bootstrap.min.css"))
    .pipe(gulp.dest("css"));
  gulp.src("node_modules/bootstrap/dist/fonts/*.*").pipe(gulp.dest("fonts"));
  gulp.src("node_modules/croppie/croppie.css").pipe(gulp.dest("css"));
  return gulp
    .src([
      "css/src/module.css",
      "bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css"
    ])
    .pipe(concat("module.css"))
    .pipe(gulp.dest("."));
});

gulp.task("assemblyInfo", function() {
  return gulp
    .src(["**/AssemblyInfo.cs", "!node_modules/**", "!_*/**"])
    .pipe(
      assemblyInfo({
        title: config.dnn.friendlyName,
        description: config.description,
        version: config.version,
        fileVersion: config.version,
        company: config.dnn.owner.organization,
        copyright: function(value) {
          return (
            "Copyright " +
            new Date().getFullYear() +
            " by " +
            config.dnn.owner.organization
          );
        }
      })
    )
    .pipe(gulp.dest("."));
});

gulp.task("build", ["assemblyInfo"], function() {
  return gulp.src("./Connect.Conference.csproj").pipe(
    msbuild({
      toolsVersion: 14.0,
      targets: ["Clean", "Build"],
      errorOnFail: true,
      stdout: true,
      properties: {
        Configuration: "Release",
        OutputPath: config.dnn.pathToAssemblies
      }
    })
  );
});

gulp.task("packageInstall", ["build"], function() {
  var packageName = config.dnn.zipName + "_" + config.version;
  var dirFilter = filter(fileTest);
  return merge(
    merge(
      gulp
        .src(
          [
            "App_LocalResources/*.resx",
            "*.ascx",
            "Views/**/*.cshtml",
            "fonts/*.*",
            "**/*.html",
            "**/*.png",
            "**/*.gif",
            "**/*.txt"
          ],
          {
            base: "."
          }
        )
        .pipe(debug({ title: "files:" })),
      gulp
        .src(["*.css", "css/*.css"], {
          base: "."
        })
        .pipe(minifyCss())
        .pipe(debug({ title: "css:" })),
      gulp
        .src(["js/*.js", "!js/*.min.js"], {
          base: "."
        })
        .pipe(uglify().on("error", gutil.log))
        .pipe(debug({ title: "js:" })),
      gulp
        .src(["js/*.min.js"], {
          base: "."
        })
        .pipe(debug({ title: "jsmin:" }))
    )
      .pipe(dirFilter)
      .pipe(zip("Resources.zip"))
      .pipe(debug({ title: "resources:" })),
    manifest(config, "./_Installation/Connect.Conference.dnn")
      .pipe(rename("Connect.Conference.dnn"))
      .pipe(debug({ title: "manifest:" })),
    gulp
      .src([
        config.dnn.pathToAssemblies + "/*.dll",
        config.dnn.pathToScripts + "/*.SqlDataProvider",
        config.dnn.pathToSupplementaryFiles + "/License.txt",
        config.dnn.pathToSupplementaryFiles + "/ReleaseNotes.txt"
      ])
      .pipe(debug({ title: "dlls:" })),
    gulp
      .src(config.dnn.pathToSupplementaryFiles + "/ReleaseNotes.md")
      .pipe(markdown())
      .pipe(rename("ReleaseNotes.txt"))
  )
    .pipe(zip(packageName + "_Install.zip"))
    .pipe(gulp.dest(config.dnn.packagesPath));
});

gulp.task("packageSource", ["build"], function() {
  var packageName = config.dnn.zipName + "_" + config.version;
  var dirFilter = filter(fileTest);
  return merge(
    gulp
      .src(
        [
          "**/*.html",
          "**/*.png",
          "**/*.gif",
          "**/*.css",
          "js/**/*.js",
          "js/**/*.ts?",
          "**/*.??proj",
          "**/*.sln",
          "**/*.json",
          "**/*.cs",
          "**/*.vb",
          "**/*.resx",
          "**/*.ascx",
          "**/*.cshtml",
          "**/*.less",
          "fonts/*.*",
          config.dnn.pathToSupplementaryFiles + "**/*.*"
        ],
        {
          base: "."
        }
      )
      .pipe(dirFilter)
      .pipe(debug({ title: "files:" }))
      .pipe(zip("Resources.zip"))
      .pipe(debug({ title: "resources:" })),
    manifest(config, "./_Installation/Connect.Conference.dnn")
      .pipe(rename("Connect.Conference.dnn"))
      .pipe(debug({ title: "manifest:" })),
    gulp
      .src([
        config.dnn.pathToAssemblies + "/*.dll",
        config.dnn.pathToScripts + "/*.SqlDataProvider",
        config.dnn.pathToSupplementaryFiles + "/License.txt",
        config.dnn.pathToSupplementaryFiles + "/ReleaseNotes.txt"
      ])
      .pipe(debug({ title: "dlls:" }))
  )
    .pipe(zip(packageName + "_Source.zip"))
    .pipe(gulp.dest(config.dnn.packagesPath));
});

gulp.task("package", ["packageInstall", "packageSource"], function() {
  return null;
});

function fileTest(file) {
  var res = false;
  for (var i = config.dnn.excludeFilter.length - 1; i >= 0; i--) {
    res =
      res |
      file.relative.startsWith(config.dnn.excludeFilter[i]) |
      (file.relative.indexOf("/obj/") > -1) |
      (file.relative.indexOf("\\obj\\") > -1);
  }
  if (!res) {
    console.log(file.relative);
  }
  return !res;
}

function startsWith(str, strToSearch) {
  return str.indexOf(strToSearch) === 0;
}
