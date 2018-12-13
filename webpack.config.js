var webpack = require("webpack");
var path = require("path");

// variables
var isProduction =
  process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";
var sourcePath = path.join(__dirname, "./js/src");
var outPath = path.join(__dirname, "./js");

module.exports = {
  context: sourcePath,
  entry: {
    app: "./App.ts"
  },
  output: {
    path: outPath,
    filename: "conference.js"
  },
  target: "web",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    mainFields: ["module", "browser", "main"],
    alias: {
      app: path.resolve(__dirname, "src/app/")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /_Development/],
        // use: [
        //   !isProduction && {
        //     loader: "babel-loader",
        //     options: {}
        //   },
        //   "ts-loader"
        // ].filter(Boolean),
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
