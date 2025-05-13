# my_webpack

Создание и настройка файла webpack.config.cjs

// ulbi - полный курс ддля продвинутых
https://www.youtube.com/watch?v=acAH2_YT6bs

// полный курс для начинающих
https://www.youtube.com/watch?v=o8KMucDpSno

// добавление в готовый проект
https://yandex.ru/video/preview/9186255581291093592

// добавление в готовый проект - 2
https://www.youtube.com/watch?v=ySHAfDXhDsk&t=193s


// как перейти на более старую или новую версию webpack
https://www.youtube.com/watch?v=gm7XAbcUn5Y


1. Инициализировать проект командой (официальный сайт -> Documentation -> guides -> Getting Started -> Basic Setup)

  npm init -> везде нажимаем enter

  2. Устанавливаем webpack командой

    npm install webpack webpack-cli --save-dev
    npm i -D webpack-dev-server   // для запуска сервера webpack


3. В файле package.json  прописать скрипты для запуска сборки webpack

    "start": "webpack server",
    "build": "webpack --env mode=production",
    "dev": "webpack --env mode=development"

    проводник(левый верхний угол) -> ...  -> сценарии NPM выбираем -> нижний левый угол -> сценарии NPM(здесь можно запускать все нужные скрипты, что бы каждый раз не прописывать их в ручную в терминале)

    Что бы скрипты запускались без ошибок, нужно во свех файлах правильно прописывать пути подключения.


4. Создание файла webpack.config.cjs или webpack.config.js

5.  Конфигурация для сборки файлов js и  создаем файл .browserslistrc для правильной сборки файлов js в разных браузерах(last 2 version   not dead  > 0.5%) Прописываем путь откуда будет браться файл js и куда будет собираться файл js

    const path = require("path");

    module.exports = (env) => {
    return {
       devServer: {
         port: 3000,
         open: true,
         hot: true,
       },
     mode: env.mode ?? "development",
     entry: path.resolve(__dirname, "src", "index.js"),
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
       },
      }
    }

6. Установка плагина для HTML(официальный сайт -> plugin -> HtmlWebpackPlugin)

  npm i -D html-webpack-plugin

  В webpack.config.cjs создаем переменную

  const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    devServer: {
         port: 3000,
         open: true,
         hot: true,
       },
     mode: env.mode ?? "development",
     entry: path.resolve(__dirname, "src", "index.js"),
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
       },
       plugins: [
         new HtmlWebpackPlugin({
           template: path.resolve(__dirname, "src", "index.html")
         }),
       ]
    }
  }


7. Установка html-loader(официальный сайт -> loaders -> html-loader)

    npm install --save-dev html-loader

В webpack.config.cjs  прописываем module: {rules: []}

module.exports = (env) => {
  return {
    devServer: {
         port: 3000,
         open: true,
         hot: true,
       },
     mode: env.mode ?? "development",
     entry: path.resolve(__dirname, "src", "index.js"),
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
       },
       plugins: [
         new HtmlWebpackPlugin( {
           template: path.resolve(__dirname, "src", "index.html")
         }),
       ]
       module: {
         rules: [
           {
             test: /\.html$/i,
             loader: "html-loader",
           },
         ],
       },
    };
}


8. В файле js, который указан в папке src пишем import index.html



9. Установка style-loader и css-loader sass-loader для того, чтобы добавлять стили css через js

    npm install --save-dev style-loader
    npm install --save-dev css-loader
    npm i -D sass sass-loader

  module.exports = (env) => {
  return {
    devServer: {
         port: 3000,
         open: true,
         hot: true,
       },
     mode: env.mode ?? "development",
     entry: path.resolve(__dirname, "src", "index.js"),
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
       },
       plugins: [
         new HtmlWebpackPlugin( {
           template: path.resolve(__dirname, "src", "index.html")
         }),
       ]
       module: {
         rules: [
           {
             test: /\.html$/i,
             loader: "html-loader",
           },
           {
             test: /\.(c|sa|sc)ss$/i,
             use: [
               "style-loader",
               "css-loader",
               "sass-loader",
             ],
           },
         ],
       },
     };
  }


10. В index.js прописываем импорт файла css, что отслеживать изменения в нем в реальном времене

   import "./style.css";


11. Установка плагина css(официальный сайт -> plugin -> MiniCssExtractPlugin)

  npm install --save-dev mini-css-extract-plugin

  В webpack.config.cjs создаем переменную
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  module.exports = (env) => {
     return {
      devServer: {
         port: 3000,
         open: true,
         hot: true,
       },
     mode: env.mode ?? "development",
     entry: path.resolve(__dirname, "src", "index.js"),
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
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
         ],
       },
      }
    }



12. Установка babel-loader

npm install -D babel-loader @babel/core @babel/preset-env
npm install --save @babel/polyfill


module.exports = (env) => {
  return {
    devServer: {
      port: 3000,
      open: true,
      hot: true,
    },
     mode: env.mode ?? "development",
     entry: ["@babel/polifill", path.resolve(__dirname, "src", "index.js")],
       output: {
         path: path.resolve(__dirname, "dist"),
         filename: "main.[contenthash].js",
         clean: true,
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
             test: /\.(?:js|mjs|cjs)$/,
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



13.  Работа со шрифтами

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
                                       //ШРИФТЫ//
            test: /\.woff2?$/i,
            type: "asset/resource",
            generator: {
              filename: "fonts/[name][ext]",
            }
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



14. Работа с картинками
установить пакет с сайта npm
npm install image-webpack-loader --save-dev

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
                                              // ШРИФТЫ //
            test: /\.woff2?$/i,
            type: "asset/resource",
            generator: {
              filename: "fonts/[name][ext]",
            }
          },
          {
                                                       // картинки //
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

