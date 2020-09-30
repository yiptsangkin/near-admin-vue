const webpack = require('webpack')
const utils = require('./build/utils')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const SpriteSmithPlugin = require('webpack-spritesmith')
const UglifyJSPlugin = require('terser-webpack-plugin')
const path = require('path')

// init event
utils.init()

// get multi pages info
const {pages, plugins, devRewriteUrl} = utils.getMultiEntries()

const prodConfig ={
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false,
                        drop_debugger: true
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: Object.assign({
                common: {
                    name: 'chunk-common',
                    priority: 1,
                    chunks: 'all',
                    minChunks: pages.length
                },
                vendors: {
                    name: 'chunk-vendors',
                    priority: 1,
                    chunks: 'all',
                    minChunks: pages.length
                }
            }, plugins)
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 5000000,
        maxAssetSize: 3000000
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css|html)$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        new SpriteSmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/assets/images/icon/'),
                glob: '**/*.png'
            },
            target: {
                image: path.resolve(__dirname, './src/assets/images/sprite/sprite.png'),
                css: path.resolve(__dirname, './src/assets/css/sprite.css')
            },
            apiOptions: {
                cssImageRef: '../images/sprite/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'left-right',
                padding: 10
            }
        }),
        new webpack.ProvidePlugin({
            dict: [path.resolve(path.join(__dirname, 'src/assets/ts/custom/dict.ts')), 'default'],
            comConfig: [path.resolve(path.join(__dirname, 'src/assets/ts/custom/config.ts')), 'default']
        })
    ],
    externals: {
        apiConfig: 'window.apiConfig'
    }
}

const devConfig = {
    plugins: [
        new HardSourceWebpackPlugin(),
        new SpriteSmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/assets/images/icon/'),
                glob: '**/*.png'
            },
            target: {
                image: path.resolve(__dirname, './src/assets/images/sprite/sprite.png'),
                css: path.resolve(__dirname, './src/assets/css/sprite.css')
            },
            apiOptions: {
                cssImageRef: '../images/sprite/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'left-right',
                padding: 10
            }
        }),
        new webpack.ProvidePlugin({
            dict: [path.resolve(path.join(__dirname, 'src/assets/ts/custom/dict.ts')), 'default'],
            comConfig: [path.resolve(path.join(__dirname, 'src/assets/ts/custom/config.ts')), 'default']
        })
    ],
    externals: {
        apiConfig: 'window.apiConfig'
    }
}

const vueConfig = {
    assetsDir: 'static',
    pages: pages,
    // 配置merge
    configureWebpack: process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    css: {
        extract: {
            ignoreOrder: true
        },
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'primary-color': '#41B783',
                        'link-color': '#41B783',
                        'border-radius-base': '2px',
                    }
                }
            }
        }
    },
    chainWebpack: config => {
        // if active analyze
        if (process.env.ANALYZE) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer')
                    .BundleAnalyzerPlugin)
                .end()
        }
        // copy public file
        config
            .plugin('copy')
            .tap(options => {
                options[0][0].ignore.push('basic.html')
                return options
            }).end()
        // alias
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', path.resolve('src'))
            .set('@api', path.resolve('src/assets/ts/api'))
            .set('@locale', path.resolve('src/assets/ts/locale'))
            .set('@corets', path.resolve('src/core/assets/ts'))
            .set('@corecp', path.resolve('src/core/component'))
            .set('@custom', path.resolve('src/assets/ts/custom'))
            .set('@store', path.resolve('src/store'))
            .set('@mock', path.resolve('src/mock'))
            .set('@css', path.resolve('src/assets/css'))
            .set('@scss', path.resolve('src/assets/scss'))
            .set('@corescss', path.resolve('src/core/assets/scss'))
            .set('@font', path.resolve('src/assets/font'))
            .set('@corestore', path.resolve('src/core/store'))
            .end()
    },
    pwa: {
        iconPaths: {
            favicon32: 'static/pwa/icons/favicon-32x32.png',
            favicon16: 'static/pwa/icons/favicon-16x16.png',
            appleTouchIcon: 'static/pwa/icons/apple-touch-icon-152x152.png',
            maskIcon: 'static/pwa/icons/safari-pinned-tab.svg',
            msTileImage: 'static/pwa/icons/msapplication-icon-144x144.png'
        }
    },
    devServer: {
        historyApiFallback: {
            rewrites: devRewriteUrl
        }
    }
}

module.exports = vueConfig
