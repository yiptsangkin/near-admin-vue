const webpack = require('webpack')
const utils = require('./build/utils')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SpriteSmithPlugin = require('webpack-spritesmith')
const UglifyJSPlugin = require('terser-webpack-plugin')
const path = require('path')

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
                    minChunks: 10
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
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../images/sprite/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'left-right',
                padding: 10
            }
        }),
        new webpack.ProvidePlugin({
            dict: [path.resolve(path.join(__dirname, 'src/assets/js/dict.js')), 'default'],
            buildConfig: [path.resolve(path.join(__dirname, 'build/config.js'))],
            comConfig: [path.resolve(path.join(__dirname, 'src/assets/js/config.js')), 'default']
        })
    ],
    externals: {
        apiConfig: 'window.apiConfig'
    }
}

const devConfig = {
    plugins: [
        new SpriteSmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/assets/image/icon/'),
                glob: '**/*.png'
            },
            target: {
                image: path.resolve(__dirname, './src/assets/image/sprite/sprite.png'),
                css: path.resolve(__dirname, './src/assets/css/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../image/sprite/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'left-right',
                padding: 10
            }
        }),
        new webpack.ProvidePlugin({
            dict: [path.resolve(path.join(__dirname, 'src/assets/js/dict.js')), 'default'],
            buildConfig: [path.resolve(path.join(__dirname, 'build/config.js'))],
            comConfig: [path.resolve(path.join(__dirname, 'src/assets/js/config.js')), 'default']
        })
    ],
    externals: {
        apiConfig: 'window.apiConfig',
        AMap: 'window.AMap'
    }
}

const vueConfig = {
    assetsDir: 'static',
    pages: pages,
    // 配置merge
    configureWebpack: process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },
    chainWebpack: config => {
        if (process.env.ANALYZE) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer')
                    .BundleAnalyzerPlugin)
                .end()
        }
        config
            .plugin('copy')
            .tap(options => {
                options[0][0].ignore.push('basic.html')
                return options
            })
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', path.resolve('src'))
            .set('@api', path.resolve('src/assets/js/api'))
            .set('@js', path.resolve('src/assets/js'))
            .set('@store', path.resolve('src/store'))
            .set('@mock', path.resolve('src/mock'))
            .set('@css', path.resolve('src/assets/css'))
    },
    devServer: {
        historyApiFallback: {
            rewrites: devRewriteUrl
        }
    }
}

module.exports = vueConfig
