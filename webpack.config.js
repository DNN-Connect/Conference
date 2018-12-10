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
    app: "./Conference.jsx"
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
        use: [
          !isProduction && {
            loader: "babel-loader",
            options: { plugins: ["react-hot-loader/babel"] }
          },
          "ts-loader"
        ].filter(Boolean)
      },
      {
        test: /.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'jquery': 'jQuery'
},
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
  ]
};
