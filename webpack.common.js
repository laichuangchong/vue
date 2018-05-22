/**
 * Created by chenzhongying on 2018/5/9.
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");//其实有minimize: true不需要他
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html模版
const CopyWebpackPlugin = require('copy-webpack-plugin');//从node_module 里面拷贝文件，到dist里面，配合externals使用配置全局变量
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css文件输出配置文件名，配合OptimizeCSSAssetsPlugin使用
// const devMode = process.env.NODE_ENV !== 'production';
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//提取js文件中的css到单独文件里面
module.exports = {
    entry: {
        "common": './src/common.js',
        "route": './src/route.js'
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            meta: {viewport: 'width=device-width, initial-scale=1'},
            title: '',
            inject: true,
            template: './src/main.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([
            {
                from: './node_modules/vue/dist/vue.min.js',
                to: 'dir/vue.min.js'
            }, {
                from: './node_modules/vue-router/dist/vue-router.min.js',
                to: 'dir/vue-router.min.js'
            },
            {
                from: './node_modules/jquery/dist/jquery.min.js',
                to: 'dir/jquery.min.js'
            }
        ])
    ],
    optimization: {
        minimizer: [
            /*new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),*/
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: {
        publicPath: "/dist/", // server-relative
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        Vue: 'vue',
        VueRouter: 'vue-router',
        $: 'jquery'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }

        ]
    }
};