import Logline from 'logline'

interface HadKey {
    isKey: boolean,
    name: string
}

const loglineObj: object = {
    setLog (modules: string, logtype: string, desc: string, data: string): void {
        Logline.using(Logline.PROTOCOL.INDEXEDDB)
        if (!modules) {
            // 默认是接口请求的错误
            modules = 'api-request'
        }
        const logObj = new Logline(modules)
        switch (logtype) {
            case 'info':
                logObj.info(desc)
                break
            case 'error':
                logObj.error(desc, data)
                break
            case 'warning':
                logObj.warning(desc)
                break
            default:
                logObj.error(desc, data)
        }
    }
}

const getHotKeyStringList = (e: KeyboardEvent): string => {
    // confirm if combine keyboard
    const ctrlKey: HadKey = {
        isKey: e.ctrlKey,
        name: 'ctrl'
    }
    const altKey: HadKey = {
        isKey: e.altKey,
        name: 'alt'
    }
    const shiftKey: HadKey = {
        isKey: e.shiftKey,
        name: 'shift'
    }
    const metaKey: HadKey = {
        isKey: e.metaKey,
        name: 'command'
    }
    const exKeyList: HadKey[] = [ctrlKey, altKey, shiftKey, metaKey]
    const keyStringList: string[] = []
    exKeyList.forEach((item) => {
        if (item.isKey) {
            keyStringList.push(item.name)
        }
    })
    keyStringList.push(e.key)
    return keyStringList.join('+')
}

const setPageTitle = (title: string): void => {
    if (title) {
        window.document.title = title
    }
}

export default {
    loglineObj,
    setPageTitle,
    getHotKeyStringList
}
