var path = require("path"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  pkg = require("../package.json"),
  local = require("../local.json");

// variables
var isProduction =
  process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";
var sourcePath = path.join(__dirname, "./js/src");
pkg = Object.assign({}, pkg, local);

var commonConfig = {
  context: sourcePath,
  target: "web",
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /_Development/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /.jsx?$/,
        exclude: [/node_modules/, /_Development/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  externals: {
    "simple-ajax-uploader": "simple-ajax-uploader",
    jquery: "jQuery"
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin({
      filename: "../module.css"
    })
  ]
};

var mainAppConfig = Object.assign({}, commonConfig, {
  context: path.join(__dirname, "./js"),
  entry: {
    conference: "./App.ts"
  },
  output: {
    path: isProduction
      ? path.resolve(__dirname, "../Server/Conference/js")
      : pkg.dnn.pathsAndFiles.devSitePath +
        "\\DesktopModules\\MVC\\Connect\\Conference\\js",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    mainFields: ["module", "browser", "main"],
    alias: {
      app: path.resolve(__dirname, "src/app/")
    }
  }
});

var libConfig = Object.assign({}, commonConfig, {
  context: path.join(__dirname, "./js"),
  entry: "./Common.ts",
  output: {
    path: isProduction
      ? path.resolve(__dirname, "../Server/Conference/js")
      : pkg.dnn.pathsAndFiles.devSitePath +
        "\\DesktopModules\\MVC\\Connect\\Conference\\js",
    filename: "common.js",
    libraryTarget: "var",
    library: "Common"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
});

module.exports = [mainAppConfig, libConfig];
