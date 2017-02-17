var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

console.log(__dirname);

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/livetest/index.js',
    output: {
        path: __dirname + '/testbin',
        filename: 'bundle.js'
    },
    module: {
        loaders: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/livetest/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname + "/app/",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};
