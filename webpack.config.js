const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: 'file-loader', 
            options: {
              name: 'img/[contenthash].[ext]'
          },
        },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};

const devMode = {
  plugins: [
    new webpack.DefinePlugin({
      HOST: JSON.stringify('http://localhost:8001'),
    }),
  ]
};

const prodMode = {
  plugins: [
    new webpack.DefinePlugin({
      HOST: JSON.stringify('https://lobster.ivanmorozov.now.sh'),
    }),
  ]
};

module.exports = env => {
  if (env === 'development') {
    return merge([
      common,
      devMode
    ])
  }
  if (env === 'production') {
    return merge([
      common,
      prodMode
    ])
  }
}
