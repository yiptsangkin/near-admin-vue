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

let optPath
let curPath = process.cwd().replace('/script',  '')

optPath = `${curPath}/src/assets/js/locale/locale_MAP.ts`
translateBasePath = `${curPath}/src/assets/js/locale/locale_BASE.ts`

try {
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
            console.log(chalk.red(`Error: No target file selected`))
        } else {
            // base locale file
            const baseFile = require(translateBasePath)
            const spinner = ora()
            response.targetLang.forEach(async function (item) {
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
                spinner.succeed(`${item} completed`)
                result.locale = localeCode
                console.log(result)
            })

        }
    }()
} catch (e) {
    console.log(chalk.red(e))
}



