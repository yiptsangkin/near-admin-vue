'use strict'
const glob = require('glob')
const buildConfig = require('./config')

// build tool set
module.exports = {
    getMultiFiles: function (globPath) {
        // get multi pages's entry and template
        let entries = {}

        glob.sync(globPath).forEach(function (entry) {
            let pathList = entry.split('/')
            let baseConfig = require('.' + entry)
            pathList.splice(-1)
            let pathname = pathList.slice(-1)[0]
            let chunks
            if (process.env.NODE_ENV === 'production') {
                chunks = ['chunk-vendors', 'chunk-common', `vendor-${pathname}`, pathname]
                // api config for the corresponding environment
                switch (process.env.BUILD_ENV) {
                    case 'prod':
                        baseConfig.externals.apiconfig.url = [`/static/js/apiConfigProd.js`]
                        break
                    case 'uat':
                        baseConfig.externals.apiconfig.url = [`/static/js/apiConfig.js`]
                        break
                    default:
                        // default uat api config
                        baseConfig.externals.apiconfig.url = [`/static/js/apiConfig.js`]
                }
            } else {
                chunks = ['chunk-vendors', 'chunk-common', 'vendor-' + pathname, 'mock', pathname]
            }
            entries[pathname] = Object.assign({
                entry: `${pathList.join('/')}/${pathname}.ts`,
                template: `public/basic.html`,
                filename: `${pathname}/${pathname}.html`,
                chunks: chunks
            }, baseConfig)
        })
        return entries
    },
    getMultiEntries: function () {
        let self = this
        const pages = self.getMultiFiles(`./src/${buildConfig.moduleName}/**/page.config.json`)
        const chunks = Object.keys(pages)
        let chunksPlugin = {}
        let devRewriteUrl = [
        ]
        chunks.forEach(function (item, index) {
            let newName = 'vendor-' + item
            chunksPlugin[item] = {
                name: newName,
                test: (module) => {
                    switch (item) {
                        // configure modules that need to be packaged separately
                        /* eg. packaged `code-mirror`, `mavon-editor`, `quill` independently
                            case 'manage':
                                return /codemirror|mavon-editor|quill/.test(module.context)
                        */
                    }
                },
                chunks: 'initial',
                minChunks: 1,
                priority: index
            }
            devRewriteUrl.push(
                {from: new RegExp(`^/${item}/?.*`), to: `/${item}/${item}.html`}
            )
        })
        // visit root url, default first rewrite rule，for demo here is /auth/auth.html
        if (devRewriteUrl.length) {
            devRewriteUrl.push(
                {
                    from: `^/.*`,
                    to: devRewriteUrl[0].to
                }
            )
        }
        return {
            pages: pages,
            plugins: chunksPlugin,
            devRewriteUrl: devRewriteUrl
        }
    }
}
