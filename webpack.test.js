'use strict';

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractStyles = new ExtractTextPlugin('[name].css');
let extractHtml = new ExtractTextPlugin('[name].html');

const appFileName = `./js/index.js`;
const context = `${__dirname}/src`;
const outputFile = `${__dirname}/app`;

module.exports = {
    context: context,
    entry: {
        app: appFileName,

    },
    output: {
        path: outputFile,
        filename: "index.js",
    },
    devServer: {
        contentBase: outputFile,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["es2015"] }
                }],
            },{
                test: /\.pug$/,
                loader: extractHtml.extract({
                    loader: ['html-loader', 'pug-html-loader?pretty&exports=false']
                })
            },
            {
                test: /\.scss$/,
                loader: extractStyles.extract({
                    loader: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname), "node_modules"]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            options: {
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
                    })
                ],
                sassLoader: {
                    includePaths: [
                        path.resolve(__dirname, 'node_modules/sanitize.css')
                    ]
                }
            }
        }),
        extractStyles,
        extractHtml
    ]
};