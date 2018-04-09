const path               = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const UglifyJsPlugin     = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js', 
        path: path.resolve(__dirname, 'dist')
    }, 
    devtool: 'source-map', 
    devServer: {
        contentBase: './dist'
    }, 
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(jpg|png)$/, 
                exclude: /node_modules/, 
                use: [
                    {
                        loader: 'file-loader', 
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }, 
                    {
                        loader: 'image-webpack-loader', 
                        options: {
                            optipng: {
                                enabled: false
                            }, 
                            pngquant: {
                                enabled: false, 
                                quality: '100'
                            }
                        }
                    }
                ]
            }, 
            {
                test: /\.woff2$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'file-loader', 
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            }, 
            {
                test: /\.scss$/, 
                exclude: /node_modules/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}}, 
                        {loader: 'postcss-loader', options: {sourceMap: true}}, 
                        {loader: 'sass-loader', options: {sourceMap: true}}
                    ]
                })
            }
        ]
    }, 
    plugins: [
        new CleanWebpackPlugin(['dist']), 
        new ExtractTextPlugin({
            filename: '[name].bundle.css'
        }), 
        new HtmlWebpackPlugin({
            filename: "index.html", 
            template: "src/views/index.html", 
            title: "Webpack Boilerplate", 
            hash: true, 
            chunks: ['app']
        }), 
        new UglifyJsPlugin()
    ]
};