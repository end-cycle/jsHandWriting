const path = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


console.log('process.env.NODE_ENV=', process.env.NODE_ENV)

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    // 'style-loader', 
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'sass-loader',],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名
                    // [ext] 自带 "." 这个与 url-loader 配置不同
                    filename: "[name][hash:8][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024 //超过50kb不转 base64
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名
                    filename: "[name][hash:8][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 超过100kb不转 base64
                    }
                }
            },
        ]
    },
    plugins: [
        new Htmlwebpackplugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        static: path.resolve(__dirname, 'public'),
        compress: true,
        port: 8080,
        open: true
    },
}
module.exports = (env, argv) => {
    console.log('argv.mode=', argv.mode);
    return config;
}