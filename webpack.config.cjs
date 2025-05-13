const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (env) => {
  return {
    devServer: {
      port: 3000,
      open: true,
      hot: true,
    },
     mode: env.mode ?? "development",
     entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
         assetModuleFilename: "images/[name][ext]",
       },
       plugins: [
         new HtmlWebpackPlugin({
           template: path.resolve(__dirname, "src", "index.html")
         }),
         new MiniCssExtractPlugin({
           filename: "css/style.[contenthash].css",
           chunkFilename: "css/[name].[contenthash].css",
         }),
       ],
       module: {
         rules: [
           {
             test: /\.html$/i,
             loader: "html-loader",
           },
           {
             test: /\.(c|sa|sc)ss$/i,
             use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               "sass-loader",
             ],
           },
          {
            test: /\.woff2?$/i,
            type: "asset/resource",
            generator: {
              filename: "fonts/[name][ext]",
            }
          },
          {
            test: /\.(jpe?g|png|webp|gif|svg)$/i,
            use: [
              {
                loader: 'image-webpack-loader',
                 options: {
                   mozjpeg: {
                     progressive: true,
                   },
                   // optipng.enabled: false will disable optipng
                   optipng: {
                     enabled: false,
                   },
                   pngquant: {
                     quality: [0.65, 0.90],
                     speed: 4
                   },
                   gifsicle: {
                     interlaced: false,
                   },
                   // the webp option will enable WEBP
                   webp: {
                     quality: 75
                   }
                 }
              }
            ],
            type: "asset/resource",
          },
          {
             test: /\.(?:js|mjs|cjs)$/i,
             exclude: /node_modules/,
             use: {
               loader: 'babel-loader',
               options: {
                 targets: "defaults",
                 presets: [
                   ['@babel/preset-env']
                 ]
               }
             }
          }
         ],
       },
      }
    }