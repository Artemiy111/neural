const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: "./js/index.js",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
    assetModuleFilename: `img/${filename("[ext]")}`,
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  mode: "development",
  target: isDev ? "web" : "browserslist",
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: isProd ? false : "source-map",
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: `index.html`,
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        removeScriptTypeAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        useShortDoctype: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/assets"),
          to: path.resolve(__dirname, "./dist/assets"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(?:|ico|gif|png|jpe?g)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
        use: ["svgo-loader"],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/inline",
        generator: {
          filename: `fonts/${filename("[ext]")}`,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
