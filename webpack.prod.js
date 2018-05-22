/**
 * Created by chenzhongying on 2018/5/9.
 */
const merge = require('webpack-merge'); //组合公共配置和不同环境下的配置
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //自动清除没有用的文件
module.exports = merge(common, {
    devtool:'source-map',
    mode:'production',
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        minimize: true //压缩代码
    },
});