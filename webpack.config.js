var path = require('path');

var staticPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'build');
var includeRegexp = /src\/*/;

module.exports = {
    context: staticPath,
    entry: {
        'app': './app.js'
    },
    output: {
        path: buildPath,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            "mainloop": path.resolve('node_modules/mainloop.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-1', 'stage-2']
                },
                include: includeRegexp
            }
        ]
    },
    externals: {
        "PIXI": "pixi"
    }
};
