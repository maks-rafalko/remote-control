// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [
                    '/build/',
                    '/__tests__/',
                ],
            },
        ],
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
