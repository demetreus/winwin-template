const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets'
};

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    },

    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },


    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },

            {
                test: /\.(woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            },

            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `${PATHS.src}/js/postcss.config.js`
                            }
                        }
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `${PATHS.src}/js/postcss.config.js`
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].css`,
        }),

        new HtmlWebpackPlugin({
            hash: true,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),

        new CleanWebpackPlugin(),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),

        new CopyWebpackPlugin([{
                from: `${PATHS.src}/img`,
                to: `${PATHS.assets}/img`
            },
            {
                from: `${PATHS.src}/fonts`,
                to: `${PATHS.assets}/fonts`
            },
            {
                from: `${PATHS.src}/static`,
                to: ''
            },
        ]),
    ],
};