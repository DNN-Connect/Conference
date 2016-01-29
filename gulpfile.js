var gulp = require('gulp'),
  msbuild = require('gulp-msbuild'),
  browserify = require('gulp-browserify'),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  assemblyInfo = require('gulp-dotnet-assembly-info'),
  plumber = require('gulp-plumber'),
  config = require('./package.json'),
  zip = require('gulp-zip'),
  filter = require('gulp-filter'),
  merge = require('merge2'),
  gutil = require('gulp-util'),
  markdown = require('gulp-markdown'),
  rename = require('gulp-rename'),
  manifest = require('gulp-dnn-manifest'),
  path = require('path'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  lessPluginCleanCSS = require('less-plugin-clean-css'),
  cleancss = new lessPluginCleanCSS({
    advanced: true
  });

gulp.task('less', function() {
  return gulp.src('css/src/less/module.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('css/src'));
});

gulp.task('css', ['less'], function() {
  gulp.src('node_modules/bootstrap/less/bootstrap.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [cleancss]
    }))
    .pipe(rename('bootstrap.min.css'))
    .pipe(gulp.dest('css'));
  gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('fonts'));
  gulp.src('node_modules/croppie/croppie.css')
    .pipe(gulp.dest('css'));
  return gulp.src(['css/src/module.css',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
    ])
    .pipe(concat('module.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('js', function() {
  return gulp.src([
      'node_modules/react/dist/react.min.js',
      'bower_components/moment/min/moment-with-locales.min.js',
      'bower_components/interact/dist/interact.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'node_modules/croppie/croppie.min.js',
      'node_modules/simple-ajax-uploader/SimpleAjaxUploader.min.js'
    ])
    .pipe(gulp.dest('js'));
});

gulp.task('browserify', function() {
  var react = gulp.src('js/src/Conference.js')
    .pipe(plumber())
    .pipe(browserify({
      transform: 'reactify',
      ignore: 'react'
    }))
    .pipe(rename('a.js'));
  var service = gulp.src('js/src/ConferenceService.js')
    .pipe(gulp.dest('js/'));
  var common = gulp.src('js/src/Common.js');
  return merge(react, service, common)
    .pipe(concat('Conference.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
  gulp.watch('js/src/**/*.js', ['browserify']);
  gulp.watch('css/src/**/*.less', ['css']);
});

gulp.task('assemblyInfo', function() {
  return gulp
    .src('**/AssemblyInfo.cs')
    .pipe(assemblyInfo({
      title: config.dnnModule.friendlyName,
      description: config.description,
      version: config.version,
      fileVersion: config.version,
      company: config.dnnModule.owner.organization,
      copyright: function(value) {
        return 'Copyright ' + new Date().getFullYear() + ' by ' + config.dnnModule.owner.organization;
      }
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['assemblyInfo'], function() {
  return gulp.src('./Connect.Conference.csproj')
    .pipe(msbuild({
      toolsVersion: 14.0,
      targets: ['Clean', 'Build'],
      errorOnFail: true,
      stdout: true,
      properties: {
        Configuration: 'Release',
        OutputPath: config.dnnModule.pathToAssemblies
      }
    }));
});

gulp.task('packageInstall', ['browserify', 'build'], function() {
  var packageName = config.dnnModule.fullName + '_' + config.version;
  var dirFilter = filter(fileTest);
  return merge(
      merge(
        gulp.src([
          'App_LocalResources/*.resx',
          '*.ascx',
          'Views/**/*.cshtml',
          'fonts/*.*'
        ], {
          base: '.'
        }),
        gulp.src([
          '**/*.html'
        ], {
          base: '.'
        })
        .pipe(dirFilter),
        gulp.src([
          '**/*.png',
          '**/*.gif',
          '**/*.txt'
        ], {
          base: '.'
        })
        .pipe(dirFilter),
        gulp.src(['*.css', 'css/*.css'], {
          base: '.'
        })
        .pipe(minifyCss())
        .pipe(dirFilter),
        gulp.src(['js/*.js', '!js/*.min.js'], {
          base: '.'
        })
        .pipe(uglify().on('error', gutil.log)),
        gulp.src(['js/*.min.js'], {
          base: '.'
        })
      )
      .pipe(zip('Resources.zip')),
      gulp.src(config.dnnModule.pathToSupplementaryFiles + '/*.dnn')
      .pipe(manifest(config)),
      gulp.src([config.dnnModule.pathToAssemblies + '/*.dll',
        config.dnnModule.pathToScripts + '/*.SqlDataProvider',
        config.dnnModule.pathToSupplementaryFiles + '/License.txt',
        config.dnnModule.pathToSupplementaryFiles + '/ReleaseNotes.txt'
      ]),
      gulp.src(config.dnnModule.pathToSupplementaryFiles + '/ReleaseNotes.md')
      .pipe(markdown())
      .pipe(rename('ReleaseNotes.txt'))
    )
    .pipe(zip(packageName + '_Install.zip'))
    .pipe(gulp.dest(config.dnnModule.packagesPath));
});

gulp.task('packageSource', ['browserify', 'build'], function() {
  var packageName = config.dnnModule.fullName + '_' + config.version;
  var dirFilter = filter(fileTest);
  return merge(
      gulp.src(['**/*.html',
        '**/*.png',
        '**/*.gif',
        '**/*.css',
        'js/**/*.js',
        '**/*.??proj',
        '**/*.sln',
        '**/*.json',
        '**/*.cs',
        '**/*.vb',
        '**/*.resx',
        '**/*.ascx',
        '**/*.cshtml',
        '**/*.less',
        'fonts/*.*',
        config.dnnModule.pathToSupplementaryFiles + '**/*.*'
      ], {
        base: '.'
      })
      .pipe(dirFilter)
      .pipe(zip('Resources.zip')),
      gulp.src(config.dnnModule.pathToSupplementaryFiles + '/*.dnn')
      .pipe(manifest(config)),
      gulp.src([config.dnnModule.pathToAssemblies + '/*.dll',
        config.dnnModule.pathToScripts + '/*.SqlDataProvider',
        config.dnnModule.pathToSupplementaryFiles + '/License.txt',
        config.dnnModule.pathToSupplementaryFiles + '/ReleaseNotes.txt'
      ])
    )
    .pipe(zip(packageName + '_Source.zip'))
    .pipe(gulp.dest(config.dnnModule.packagesPath));
})

gulp.task('package', ['packageInstall', 'packageSource'], function() {
  return null;
})

function fileTest(file) {
  var res = false;
  for (var i = config.dnnModule.excludeFilter.length - 1; i >= 0; i--) {
    res = res | file.relative.startsWith(config.dnnModule.excludeFilter[i]) | file.relative.indexOf('/obj/') > -1;
  };
  return !res;
}

function startsWith(str, strToSearch) {
  return str.indexOf(strToSearch) === 0;
}