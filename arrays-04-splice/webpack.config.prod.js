const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        // relative path to this file
        filename: 'app.js',
        // absolute path, as a new file needs to be created using the fs
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: '/assets/scripts/'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname)
        },
    },
    devtool: 'source-map',
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
o}