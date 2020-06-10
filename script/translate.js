// for translate i18n file to target lang by machine
const translate = require('google-translate-open-api').default
const {parseMultiple, getAllCode} = require('google-translate-open-api')
const prompts = require('prompts')
const fs = require('fs')
const chalk = require('chalk')
const ora = require('ora')

const ableLang = getAllCode()
const getTranslate = async function (opt) {
    let strList = []
    if (typeof opt.obj === 'object') {
        for (let key in opt.obj) {
            if (key !== 'locale' && key !== 'country') {
                const result = await getTranslate({
                    obj: opt.obj[key]
                })
                if (typeof result === 'string') {
                    strList.push(result)
                } else if (Array.isArray(result)) {
                    strList = strList.concat(result)
                }
            }
        }
    } else if (Array.isArray(opt.obj)) {
        for (let i = 0; i < opt.obj.length; i++) {
            const result = await getTranslate({
                obj: opt.obj[i]
            })
            if (typeof result === 'string') {
                strList.push(result)
            } else if (Array.isArray(result)) {
                strList = strList.concat(result)
            }
        }
        return strList
    } else {
        return opt.obj
    }
    return strList
}

const withBaseFile = function (str) {
    return ['locale_BASE.ts', 'locale_MAP.ts'].indexOf(str) === -1
}

const curPath = process.cwd().replace('/script',  '')
const basePath = `${curPath}/src/assets/ts/locale`
const optPath = `${basePath}/locale_MAP.ts`
const translateBasePath = `${basePath}/locale_BASE.ts`
const corePath = `${curPath}/src/core/assets/ts`

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
    void async function () {
        // select target language
        const response = await prompts([
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
            // tips loading
            spinner.text = `translating ${item}...`
            spinner.start()
            let localeCode = localeConfig[item].locale
            let targetFile = JSON.parse(JSON.stringify(baseFile))
            const srcResult = await getTranslate({
                obj: targetFile
            })
            // translate all string
            const finalResult = await translate(srcResult, {
                tld: 'cn',
                from: baseFile.locale || 'auto',
                to: localeCode || 'zh-cn'
            })
            let translatedList = []
            finalResult.data.forEach(function (item) {
                translatedList = translatedList.concat(parseMultiple(item))
            })
            targetFile.locale = localeCode
            targetFile.country = item.split('_')[1]
            let resultText = JSON.stringify(targetFile,null, 4)
            const keyList = resultText.match(/".*?":/g)
            keyList.forEach(function (citem) {
                if (!/-/.test(citem)) {
                    resultText = resultText.replace(citem, citem.replace(/"/g, ''))
                }
            })
            resultText = resultText.replace(/"/g, '\'')
            // replace translate info
            srcResult.forEach(function (citem, cindex) {
                resultText = resultText.replace(citem, translatedList[cindex])
            })
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
        let tplFileCtx = fs.readFileSync(`${curPath}/script/tpl/lang/lang.tpl`, 'utf-8')
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



