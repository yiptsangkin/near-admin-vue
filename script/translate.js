// for translate i18n file to target lang by machine
const translate = require('google-translate-open-api').default
const {parseMultiple, getAllCode} = require('google-translate-open-api')
const prompts = require('prompts')
const fs = require('fs')
const chalk = require('chalk')
const ora = require('ora')

const ableLang = getAllCode()
const getTranslate = async function (opt) {
    if (Array.isArray(opt.obj)) {
        for (let i = 0; i < opt.obj.length; i++) {
            const result = await getTranslate({
                tld: opt.tld || 'cn',
                from: opt.from || 'auto',
                to: opt.to || 'zh-cn',
                obj: opt.obj[i]
            })
            if (typeof result === 'string') {
                opt.obj[i] = result
            }
        }
        return opt.obj
    } else if (typeof opt.obj === 'object') {
        for (let key in opt.obj) {
            if (key !== 'locale') {
                const result = await getTranslate({
                    tld: opt.tld || 'cn',
                    from: opt.from || 'auto',
                    to: opt.to || 'zh-cn',
                    obj: opt.obj[key]
                })
                if (typeof result === 'string') {
                    opt.obj[key] = result
                }
            }
        }
        return opt.obj
    } else {
        const result = await translate([opt.obj], {
            tld: opt.tld || 'cn',
            from: opt.from || 'auto',
            to: opt.to || 'zh-cn'
        })
        if (Array.isArray(result.data)) {
            return parseMultiple(result.data[0])
        } else {
            return result.data
        }
    }
}

const withBaseFile = function (str) {
    return ['locale_BASE.ts', 'locale_MAP.ts'].indexOf(str) === -1
}

const curPath = process.cwd().replace('/script',  '')
const basePath = `${curPath}/src/assets/ts/locale`
const optPath = `${basePath}/locale_MAP.ts`
const translateBasePath = `${basePath}/locale_BASE.ts`
const corePath = `${curPath}/src/assets/ts/core`

try {
    // remove all locale file (without locale_BASE.ts and locale_MAP.ts)
    const deleteFileList = fs.readdirSync(basePath)
    deleteFileList.forEach(function (item) {
        if (withBaseFile(item)) {
            fs.unlinkSync(`${basePath}/${item}`)
        }
    })
    const optObj =  fs.statSync(optPath)
    const isFile = optObj.isFile()
    let localeConfig
    let choices = []
    if (isFile) {
        localeConfig = require(optPath)
        for (let key in localeConfig) {
            if (ableLang.indexOf(localeConfig[key].locale) !== -1) {
                choices.push({
                    title: key,
                    value: key
                })
            }
        }
    } else {
        console.log(chalk.red(`Error: ${optPath} is not a file`))
    }
    let response
    void async function () {
        // select target language
        response = await prompts([
            {
                type: 'multiselect',
                name: 'targetLang',
                instructions: false,
                message: 'Pick target language',
                choices: choices
            }
        ])

        if (response.targetLang.length === 0) {
            console.warn(chalk.yellow(`Warning: No target file selected. Default locale 'zh-cn, zh-tw, en, ja, ko'`))
            response.targetLang = ['zh_CN', 'zh_TW', 'en_US', 'ja_JP', 'ko_KR']
        }
        // base locale file
        const baseFile = require(translateBasePath)
        const spinner = ora()
        for (let i = 0; i < response.targetLang.length; i++) {
            let item = response.targetLang[i]
            let index = i
            // tips loading
            spinner.text = `translating ${item}...`
            spinner.start()
            let localeCode = localeConfig[item].locale
            let targetFile = JSON.parse(JSON.stringify(baseFile))
            let result = await getTranslate({
                obj: targetFile,
                from: baseFile.locale,
                to: localeCode
            })
            result.locale = localeCode
            let resultText = JSON.stringify(result, null, 4)
            const keyList = resultText.match(/\".*?\":/g)
            keyList.forEach(function (item) {
                resultText = resultText.replace(item, item.replace(/\"/g, ''))
            })
            resultText = resultText.replace(/\"/g, '\'')
            // save locale file
            let finalText = `export default ${resultText}\n`
            try {
                fs.writeFileSync(`${basePath}/${item}.ts`, finalText)
                spinner.succeed(`${item} completed`)
            } catch (e) {
                console.log(e)
            }
        }
        // if all completed
        spinner.succeed(`all completed`)
        const currentLocaleList = fs.readdirSync(basePath)
        let antdLocale = []
        let customLocale = []
        let antdOpt = []
        let customOpt = []
        let declareList = []
        currentLocaleList.forEach(function (citem) {
            if (withBaseFile(citem)) {
                let defaultName = citem.split('.')[0]
                let antdName = defaultName.replace('_', '')
                let customerName = `custom${antdName.charAt(0).toUpperCase()}${antdName.slice(1)}`
                antdLocale.push(`import ${antdName} from 'ant-design-vue/lib/locale-provider/${defaultName}'`)
                customLocale.push(`import ${customerName} from '@locale/${citem}'`)
                antdOpt.push(`[${antdName}.locale]: ${antdName}`)
                customOpt.push(`[${antdName}.locale]: ${customerName}`)
                declareList.push(`declare module 'ant-design-vue/lib/locale-provider/${defaultName}' {\n    const ${defaultName}: any\n    export default ${defaultName}\n}\n`)
            }
        })
        // read lang.tpl
        let tplFileCtx = fs.readFileSync(`${corePath}/lang.tpl`, 'utf-8')
        tplFileCtx = tplFileCtx.replace('<% importTpl %>', `${antdLocale.join('\n')}\n${customLocale.join('\n')}`)
            .replace('<% exportAntdTpl %>', `${antdOpt.join(',\n    ')}`)
            .replace('<% exportCustomerTpl %>', `${customOpt.join(',\n        ')}`)
        fs.writeFileSync(`${corePath}/lang.ts`, tplFileCtx)
        fs.writeFileSync(`${curPath}/src/lang.d.ts`, declareList.join('\n'))
        console.log(chalk.green('translate success'))
    }()
} catch (e) {
    console.log(chalk.red(e))
}



