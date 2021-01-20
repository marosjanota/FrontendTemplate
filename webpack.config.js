const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

const { resolve } = require('path')
const fs = require('fs');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim() || 'production'

/**
 * Config for basic setup
 */
const Controls_Path = './Controls';
const Pages_Path = './Pages';

const Output_Path = './wwwroot/';
/**
 * End of config
 */

function autodiscoverEntryPoints(directory) {
    const directoryItems =  fs.readdirSync(directory);
    let matchedFiles = [];
    let matchedEntryPoints = {};
    for (const entry of directoryItems) {
        const entryPath = `${directory}/${entry}`;
        if(fs.lstatSync(entryPath).isDirectory()) {
            const entryPoints = autodiscoverEntryPoints(entryPath);
            matchedEntryPoints = {...matchedEntryPoints, ...entryPoints}
        } else if((entryPath.endsWith('.ts') && !entryPath.endsWith('.d.ts')) || entryPath.endsWith('.scss')) {
            matchedFiles.push(entryPath);
        }
    }
    if(matchedFiles.length > 0) {
        const pathSegments = directory.split('/');
        const moduleName = pathSegments[pathSegments.length - 1];
        matchedEntryPoints[`${directory}/${moduleName}`] = matchedFiles;
    }
    return matchedEntryPoints;
}
const controlEntryPoints = autodiscoverEntryPoints(Controls_Path);
const pagesEntryPoints = autodiscoverEntryPoints(Pages_Path);


const entryPoints = {
    ...pagesEntryPoints,
    ...controlEntryPoints,
    './Resources/Styles/style': './Resources/Styles/style.scss',
    './Resources/Scripts/app': './Resources/Scripts/app.ts',
}

module.exports = (env, argv) => 
{
    const devMode = (argv.mode && argv.mode.trim() || ENV) === 'development'
    return {
        mode: devMode ? 'development' : 'production',
        target: 'web',
        entry: entryPoints,
        output: {
            filename: '[name].js',
            path: resolve(__dirname, Output_Path)
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.scss', '.css', '.html'],
            modules: [
                resolve(__dirname, 'Resources'),
                resolve(__dirname, 'Pages'),
                resolve(__dirname, 'Controls'),
                resolve(__dirname, 'node_modules'),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                }, {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions(loader) {
                                    const plugins = [
                                        require('autoprefixer')({ flexbox: true, grid: 'autoplace' }),
                                        require('postcss-assets')({}),
                                        require('postcss-import')({}),
                                        require('postcss-url')({ options: 'inline' }),
                                        require('cssnano')({}),
                                        new IconfontWebpackPlugin({
                                            resolve: loader.resolve,
                                            enforcedSvgHeight: 512,
                                            module: true
                                        })
                                    ]

                                    return { plugins }
                                }
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                webpackImporter: false,
                                implementation: require('sass'),
                                sourceMap: devMode
                            }
                        }, 
                    ]
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ]
    }
}
