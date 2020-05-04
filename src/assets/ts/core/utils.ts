import Logline from 'logline'

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

const setPageTitle = (title: string): void => {
    if (title) {
        window.document.title = title
    }
}

export default {
    loglineObj,
    setPageTitle
}
