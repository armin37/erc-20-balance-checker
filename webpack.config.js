const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        fallback: {
            assert: false,
            url: false,
            os: false
        },
    },
    mode: 'development',
    entry: {
        index: './src/code.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist/index.html',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                loader: 'babel-loader',
                test: /\.js|\.jsx$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};
