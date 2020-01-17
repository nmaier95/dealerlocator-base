const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

const exportType = process.argv[process.argv.indexOf('--export-type') + 1];

module.exports = {
    // gets overwritten by --mode development/production of npm start command
    mode: 'development',

    entry: [path.resolve(__dirname, 'src', 'index.js')],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist', exportType),
        libraryTarget: exportType,
        library: exportType === 'var' ? 'DL' : '',
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.done.tap('DonePlugin', (stats) => {
                    const output = jsdoc2md.renderSync({ files: './src/partials/**/*.js' });
                    fs.writeFileSync('README.md', output);
                });
            }
        }
    ]
}
