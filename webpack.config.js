const webpack = require("webpack");
const path = require("path");
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: "./src/js/index.js",
    output: {
        path: path.join(__dirname, "static"),
        filename: "main.js", // no hash in main.js because index.html is a static page
        publicPath: "static/", // relative path for github pages
        // chunkFilename: "[hash]/js/[id].js",
        // hotUpdateMainFilename: "[hash]/update.json",
        // hotUpdateChunkFilename: "[hash]/js/[id].update.js"
    },
    // recordsOutputPath: path.join(__dirname, "records.json"),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    }
};