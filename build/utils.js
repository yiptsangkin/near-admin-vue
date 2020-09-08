'use strict'
const glob = require('glob')
const buildConfig = require('./config')
const chalk = require('chalk')
const fs = require('fs')

// build tool set
module.exports = {
    createApiConfigFile () {
        const self = this
        const curPath = process.cwd().replace('/script',  '')
        const publicJs  = `${curPath}/public/static/js`
        const comApiContent = `var apiConfig = { apiHost: '' }`
        buildConfig.envList.forEach((item) => {
            const targetPath = `${publicJs}/apiConfig${self.upperFirstCase(item)}.js`
            if (!fs.existsSync(targetPath)) {
                fs.writeFileSync(targetPath, comApiContent)
            }
        })
        console.log(chalk.green('Create multiples environment api config successfully!'))
    },
    upperFirstCase (str) {
        if (str) {
            let charList = str.split('')
            charList[0] = charList[0].toUpperCase()
            return charList.join('')
        } else {
            return null
        }
    },
    getMultiFiles (globPath) {
        const self = this
        // get multi pages's entry and template
        let entries = {}
        let finalEntries = []
        const entriesListByCmd = process.env.ENTRYS ? process.env.ENTRYS.split(',') : []
        if (entriesListByCmd.length > 0) {
            entriesListByCmd.forEach(function (item) {
                finalEntries.push(`./src/pages/${item}/page.config.json`)
            })
        } else {
            finalEntries = glob.sync(globPath)
        }
        finalEntries.forEach(function (entry) {
            const pathList = entry.split('/')
            const baseConfig = require(`.${entry}`)
            pathList.splice(-1)
            // api config for the corresponding environment
            baseConfig.externals.apiconfig.url = [`/static/js/apiConfig${self.upperFirstCase(process.env.BUILD_ENV) || 'Dev'}.js`]
            const pathname = pathList.slice(-1)[0]
            let chunks
            if (process.env.NODE_ENV === 'production') {
                chunks = ['chunk-vendors', 'chunk-common', pathname]
            } else {
                chunks = ['chunk-vendors', 'chunk-common', 'mock', pathname]
            }
            entries[pathname] = Object.assign({
                entry: `${pathList.join('/')}/${pathname}.ts`,
                template: `public/basic.html`,
                filename: `${pathname}.html`,
                chunks: chunks
            }, baseConfig)
        })
        return entries
    },
    getMultiEntries () {
        const self = this
        const pages = self.getMultiFiles(`./src/${buildConfig.moduleName}/**/page.config.json`)
        const chunks = Object.keys(pages)
        let chunksPlugin = {}
        let devRewriteUrl = [
        ]
        chunks.forEach(function (item, index) {
            devRewriteUrl.push(
                {from: new RegExp(`^/(${item}|${item}.html)/?.*`), to: `/${item}.html`}
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
    },
    init () {
        const self = this
        self.createApiConfigFile()
    }
}
