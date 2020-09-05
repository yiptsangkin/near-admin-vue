const prompts = require('prompts')
const chalk = require('chalk')
const cprocess = require('child_process')
const os = require('os')

const curPath = process.cwd().replace('/script',  '')
const pageTpl = `${curPath}/script/tpl/page`
const targetPage = `${curPath}/src/pages`

try {
    void async function () {
        const page = await prompts([
            {
                type: 'text',
                name: 'pageName',
                instructions: false,
                message: 'Create a page application which named:'
            }
        ])
        // check if page name is lowercase
        if (page.pageName !== page.pageName.toLowerCase()) {
            page.pageName = page.pageName.toLowerCase()
            console.warn(chalk.yellow('Uppercase is changed to lowercase.'))
        }
        // create a page application to `src/pages` and replace some character to page name
        const platform = os.platform()
        let cpCmd
        switch (platform) {
            case 'darwin':
                cpCmd = `cp -r ${pageTpl}/. ${targetPage}/${page.pageName} &&
                    mv ${targetPage}/${page.pageName}/page.ts ${targetPage}/${page.pageName}/${page.pageName}.ts`
                break
            case 'linux':
                cpCmd = `cp -r ${pageTpl}/. ${targetPage}/${page.pageName} &&
                    mv ${targetPage}/${page.pageName}/page.ts ${targetPage}/${page.pageName}/${page.pageName}.ts`
                break
            case 'win32':
                cpCmd = `echo d a | xcopy ${pageTpl} ${targetPage}\\${page.pageName} && 
                    rename ${targetPage}\\${page.pageName}\\page.ts ${page.pageName}.ts`
                break
        }
        cprocess.execSync(cpCmd, {stdio: 'inherit'})
        console.log(chalk.green('Create successfully!'))
    }()
} catch (e) {
    console.log(chalk.red(e))
}
