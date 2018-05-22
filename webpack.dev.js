/**
 * Created by chenzhongying on 2018/5/9.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
console.log(process.env.NODE_ENV);
module.exports = merge(common,{
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        hot: true
    },
    optimization: {
        minimize: true
    },
    mode:'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热启动
    ]
});