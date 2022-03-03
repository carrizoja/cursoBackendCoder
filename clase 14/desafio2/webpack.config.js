const path = require('path');

// Luego en consola npm install ts-loader webpack-node-externals

const nodeExternals = require("webpack-node-externals");


module.exports = {
    mode: "production",
    entry: "./src/app.ts",
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?/,
            use: "ts-loader",
            exclude: /node_modules/

        }]
    }
}