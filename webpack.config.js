var webpack = require("webpack");
var path = require("path");

// variables
var isProduction =
  process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";
var sourcePath = path.join(__dirname, "./js/src");
var outPath = path.join(__dirname, "./js");

var commonConfig = {
  context: sourcePath,
  target: "web",
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
    react: "React",
    "react-dom": "ReactDOM",
    "simple-ajax-uploader": "simple-ajax-uploader",
    jquery: "jQuery"
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
  ]
};

var mainAppConfig = Object.assign({}, commonConfig, {
  entry: {
    conference: "./App.ts"
  },
  output: {
    path: outPath,
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
  entry: "./Common.ts",
  output: {
    path: outPath,
    filename: "common.js",
    libraryTarget: "var",
    library: "Common"
  }
});

module.exports = [mainAppConfig, libConfig];
