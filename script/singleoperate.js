const prompts = require('prompts')
const fs = require('fs')
const chalk = require('chalk')
const ora = require('ora')
const glob = require('glob')
const cprocess = require('child_process')

const operator = process.argv.slice(-1)[0]

const curPath = process.cwd().replace('/script',  '')
const multiPagePath  = `${curPath}/src/pages/*`

try {
    let choices = []

    glob.sync(multiPagePath).forEach(function (entry) {
        const entryList = entry.split('/')
        const entryName = entryList.slice(-1)[0]
        choices.push({
            title: entryName,
            value: entryName
        })
    })

    void async function () {
        // select target entry
        const entryres = await prompts([
            {
                type: 'multiselect',
                name: 'targetEntry',
                instructions: false,
                message: 'Pick target entry',
                choices: choices
            }
        ])
        if (entryres.targetEntry.length === 0) {
            console.warn(chalk.red(`Warning: No target entry selected.`))
        } else {
            let envres
            if (operator === 'build') {
                envres = await prompts([
                    {
                        type: 'select',
                        name: 'targetEnv',
                        instructions: false,
                        message: 'Pick target environment',
                        choices: [
                            {
                                title: 'prod',
                                value: 'prod'
                            },
                            {
                                title: 'uat',
                                value: 'uat'
                            },
                            {
                                title: 'dev',
                                value: 'dev'
                            }
                        ]
                    }
                ])
            }

            let clean
            if (operator === 'build') {
                clean = await prompts([
                    {
                        type: 'select',
                        name: 'targetClean',
                        instructions: false,
                        message: 'Pick clean dist or not',
                        choices: [
                            {
                                title: 'yes',
                                value: ''
                            },
                            {
                                title: 'no',
                                value: '--no-clean'
                            }
                        ]
                    }
                ])
            }

            let cmd
            if (operator === 'build') {
                envres.targetEnv = envres.targetEnv || 'prod'
                cmd = `ENTRYS=${entryres.targetEntry.map((e) => {return e}).join(',')} BUILD_ENV=${envres.targetEnv} vue-cli-service build ${clean.targetClean}`
            } else {
                cmd = `ENTRYS=${entryres.targetEntry.map((e) => {return e}).join(',')} vue-cli-service serve`
            }
            cprocess.execSync(cmd, {stdio: 'inherit'})
        }
    }()
} catch (e) {
    console.log(chalk.red(e))
}

