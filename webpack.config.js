const webpack = require('webpack');
const babelenv = require('babel-preset-env');
const babelreact = require('babel-preset-react');
const babelcommonjs = require('babel-plugin-transform-es2015-modules-commonjs');

module.exports = {
    devServer: {
        contentBase: '/Users/MiguelPorras/Desktop/grid-visor/',
        compress: false,
        host: '192.168.121.2',
        port: 9000
    },
    entry: {
        polyfills: './src/polyfills.js',
        index: './src/index.js'
    },
    output: {
        filename: '[name].reactTable.js',        
        path: '/Users/MiguelPorras/Desktop/grid-visor/build',
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "performanceTable"
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [babelenv, babelreact],
                        plugins: [babelcommonjs]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    target: 'node',
    mode: 'development',
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             sourceMap: true,
    //             uglifyOptions:{
    //                 warnings: false,
    //                 ie8: true,
    //                 safari10: true
    //             }
    //         })
    //     ]
    // },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            'global': {}, // bizarre lodash(?) webpack workaround
            'global.GENTLY': false // superagent client fix
        })
    ]
};