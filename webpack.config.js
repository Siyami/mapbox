var webpack = require('webpack')
var path = require('path');

module.exports = {
    // Disable for production deployment
    entry: ["webpack-dev-server/client?http://localhost:8081", "./app/app.js"],
    // entry: ["./app/app.js"],
    output: {
        publicPath: "/dist/app/",
        path: __dirname + "/dist/app",
        filename: "bundle.js"
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'app')
        ],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: "/node_modules",
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"],
                exclude: "/node_modules"
            },
            {
                test: /\.(png|jpg)$/,
                include: path.join(__dirname, 'img'),
                loader: 'url-loader?limit=10000'
            }
        ],
    },
    // Disable for production deployment
    devTool: "source-map"
}
