const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: './src/main.tsx',
    resolve: {
        // Подключаем jsx, ts, tsx расширения, чтобы можно было делать import модеулей
        // https://webpack.js.org/configuration/resolve/#resolveextensions
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {

        rules: [
            {
                // регулярное выражение для поиска js, jsx, ts, tsx
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'], // исключаем попадание node_modules в лоадер
                // https://webpack.js.org/loaders/babel-loader/#babel-loader-is-slow
                exclude: /node_modules/
            },

            {
                test: /\.css$/,

                // https://webpack.js.org/loaders/style-loader/
                // https://webpack.js.org/loaders/css-loader/
                // https://webpack.js.org/loaders/postcss-loader/
                // порядок имеет значение
                use: [ 'style-loader', 'css-loader', 'postcss-loader'],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ]
            },

            // {
            //     test: /\.css$/i, include: [path.resolve(__dirname, 'src')], use: ['style-loader', {
            //         loader: MiniCssExtractPlugin.loader, options: {
            //             esModule: false
            //         }
            //     }, {
            //         loader: "css-loader"
            //     }, 'postcss-loader'],
            // },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            // Встроенный модуль Asset Modules позволяет работать с статическими файлами без
            // дополнтиельных модулей
            // https://webpack.js.org/guides/asset-modules/
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            }
        ],
    },
    output: {
        // путь до директории с файлами сборки
        // https://webpack.js.org/configuration/output/#outputpath
        path: path.resolve(__dirname, 'build'),
        // очищать директорию от предыдущих сборок
        // https://webpack.js.org/configuration/output/#outputclean
        clean: true,
        // https://webpack.js.org/configuration/output/#outputfilename
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].css',
        // }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
            }
        })
    ]
};