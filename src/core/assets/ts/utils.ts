import Logline from 'logline'
import {HadKey, ReqType, LoglineParams, CpInfo, NavList} from '@corets/type';
import axios, {AxiosRequestConfig} from 'axios'
import dict from '@custom/dict'
import Vue from 'vue'

const loglineObj: any = {
    setLog ({module, logType, desc, data}: LoglineParams): void {
        Logline.using(Logline.PROTOCOL.INDEXEDDB)
        if (!module) {
            // 默认是接口请求的错误
            module = 'api-request'
        }
        const logObj = new Logline(module)
        switch (logType) {
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
    },
    // get log
    getLog (start: string, end: string, callback: any) {
        // start, end的单位为d，例如：1天-1d，半天-.5d，
        if (start && end) {
            // 获取start-end范围内的日志
            Logline.get(start, end, (logs: any) => {
                if (callback) {
                    callback(logs)
                } else {
                    console.log(logs)
                }
            })
        } else if (start && !end) {
            // 获取start天内的日志
            Logline.get(start, (logs: any) => {
                if (callback) {
                    callback(logs)
                } else {
                    console.log(logs)
                }
            })
        } else {
            // 获取所有日志
            Logline.all((logs: any) => {
                if (callback) {
                    callback(logs)
                } else {
                    console.log(logs)
                }
            })
        }
    },
    // clear log
    cleanLog (): void {
        Logline.clean()
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
    keyStringList.push(e.key.toLowerCase())
    return keyStringList.join('+')
}

const setPageTitle = (title: string): void => {
    if (title) {
        window.document.title = title
    }
}

const sendReq = async (params: ReqType) => {
    // check url
    if (!params.url) {
        Vue.prototype.$message.error(Vue.prototype.$t(dict.localeObj.requestInfo.withoutUrl))
        return false
    }
    // set default value
    params.headers = params.headers || {}
    params.headers['Content-Type'] = params.headers['Content-Type'] || 'application/json'
    params.timeout = params.timeout || 20000
    params.method = params.method || 'POST'
    params.responseType = params.responseType || 'json'
    const rCfg: AxiosRequestConfig = {
        headers: params.headers,
        responseType: params.responseType,
        timeout: params.timeout
    }
    if (params.method === 'POST') {
        try {
            const result: any = await axios.post(params.url, params.data, rCfg)
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                loglineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            loglineObj.setLog({
                logType: 'error',
                desc: 'api fail',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else if (params.method === 'GET') {
        try {
            const getParams = Object.assign({ params: params.data }, rCfg)
            const result: any = await axios.get(params.url, getParams)
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                loglineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            loglineObj.setLog({
                logType: 'error',
                desc: 'api fail',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else if (params.method === 'PUT') {
        try {
            const result: any = await axios.put(params.url, params.data, rCfg)
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                loglineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            loglineObj.setLog({
                logType: 'error',
                desc: 'api fail',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else if (params.method === 'DELETE') {
        try {
            const getParams = Object.assign({ params: params.data }, rCfg)
            const result: any = await axios.delete(params.url, getParams)
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                loglineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            loglineObj.setLog({
                logType: 'error',
                desc: 'api fail',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    }
}

const decodeParams = (params: string): any => {
    try {
        return JSON.parse(decodeURIComponent(params))
    } catch (e) {
        return {}
    }
}

const encodeParams = (params: any): string => {
    try {
        return encodeURIComponent(JSON.stringify(params))
    } catch (e) {
        return ''
    }
}

const isUrl = (str: string): boolean => {
    const urlReg = /^((http:\/\/)|(https:\/\/))/g
    if (urlReg.test(str)) {
        return true
    } else {
        return false
    }
}

const isEmpty = (val: any): boolean => {
    if (Array.isArray(val)) {
        if (val.length > 0) {
            return false
        } else {
            return true
        }
    } else {
        return !(val !== undefined && val !== null && val !== '')
    }
}

const randomCharacter = (rdn: number): string => {
    const newList = []
    const characterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    for (let i = 0; i < rdn; i++) {
        const rdnChar = characterList[parseInt((Math.random() * characterList.length).toString(), 10)]
        newList.push(i === 0 ? rdnChar : rdnChar.toLowerCase())
    }
    return newList.join('')
}

const isRegExp = (v: any): boolean => {
    return Object.prototype.toString.call(v) === '[object RegExp]'
}

const arrayRemove = (arr: any[], item: any): any[] | void => {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

const isDef = (v: any) => {
    return v !== undefined && v !== null
}

const isAsyncPlaceholder = (node: any) => {
    return node.isComment && node.asyncFactory
}

const getFirstComponentChild = (children: any) => {
    if (Array.isArray(children)) {
        for (const c of children) {
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c
            }
        }
    }
}

const getDeviceInfo = (qt: 'browser' | 'machine') => {
    const userAgent = window.navigator.userAgent
    if (qt === 'browser') {
        const isOpera = userAgent.indexOf('Opera') > -1
        const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera
        const isFF = userAgent.indexOf('Firefox') > -1
        const isSafari = userAgent.indexOf('Safari') > -1
        const isChrome = userAgent.indexOf('Chrome') > -1
        const isEdge = userAgent.indexOf('Edge') > -1
        if (isIE) {
            const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
            reIE.test(userAgent)
            const ieVersion = parseFloat(RegExp.$1)
            return `IE${ieVersion}`
        } else if (isFF) {
            return 'Firefox'
        } else if (isOpera) {
            return 'Opera'
        } else if (isChrome) {
            return 'Chrome'
        } else if (isEdge) {
            return 'Edge'
        } else if (isSafari) {
            return 'Safari'
        } else {
            return 'Unknown'
        }
    } else if (qt === 'machine') {
        const isAndroid = userAgent.indexOf('Android') > -1
        const isIphone = userAgent.indexOf('iPhone') > -1
        const isIpad = userAgent.indexOf('iPad') > -1
        const isMac = /macintosh|mac os x/i.test(userAgent)
        const isWindows = userAgent.indexOf('win64') >= 0 || userAgent.indexOf('wow64') >= 0
        if (isAndroid) {
            return 'Android'
        } else if (isIphone) {
            return 'Iphone'
        } else if (isIpad) {
            return 'Ipad'
        } else if (isMac) {
            return 'OSX'
        } else if (isWindows) {
            return 'Windows'
        } else {
            return 'Unknown'
        }
    } else {
        console.warn('no match query type')
    }
}

const fullScreenCtl = (tp: boolean) => {
    const ele = document.documentElement
    if (tp) {
        if (ele.requestFullscreen) {
            ele.requestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
}

const getBreadList = (self: any, navIndex: string) => {
    const navIndexList = navIndex.split('-sub-')
    const topMenuIndex = navIndexList[0].split('-')[1]
    const asideMenuIndexList = navIndexList[1].split('-')
    const breadList = []
    const menuObj = self.$store.getters.menuObj

    const topMenuObj = menuObj.menuList[topMenuIndex]
    topMenuObj.navIndex = `menu-${topMenuIndex}`

    let temMenuList = topMenuObj.child
    temMenuList.forEach((item: any, index: any) => {
        item.navIndex = `${topMenuObj.navIndex}-sub-${index}`
    })
    breadList.push(topMenuObj)
    asideMenuIndexList.forEach((item, index) => {
        const temMenuObj = temMenuList[item]
        temMenuList = temMenuObj.child || []
        temMenuList.forEach((sitem: any, sindex: any) => {
            sitem.navIndex = `${temMenuObj.navIndex}-${sindex}`
        })
        breadList.push(temMenuObj)
    })
    return breadList
}

const getCpMenuByNavIndex = (self: any, navIndex: string): NavList | undefined => {
    if (navIndex.startsWith('menu')) {
        const navIndexList = navIndex.split('-sub-')
        const topMenuIndex = navIndexList[0].split('-')[1]
        const asideMenuIndexList = navIndexList[1].split('-')
        const menuObj = self.$store.getters.menuObj

        const topMenuObj = menuObj.menuList[topMenuIndex]

        let temMenuList = topMenuObj.child
        let targetMenuObj
        asideMenuIndexList.forEach((item, index) => {
            const temMenuObj = temMenuList[item]
            temMenuList = temMenuObj.child || []
            targetMenuObj = temMenuObj
        })
        return targetMenuObj
    } else {
        return undefined
    }
}

const handlerMenuSelect = (self: any, n: string[]) => {
    if (!n || !n[0] || typeof n[0] !== 'string') {
        // check if have value
        return false
    }
    // check if click by tag, if true, no need to emit change-cp
    const notFromMenuReg = /@bytag@/g
    const isNotFromMenu = notFromMenuReg.test(n[0])
    const cpIndex = n[0].replace('@bytag@', '')
    const existMenu = getCpMenuByNavIndex(self, cpIndex)

    // check if side menu exist index
    if (existMenu) {
        // exist
        const cpPath = existMenu.path
        const cpTitle = existMenu.name
        const menuParams = existMenu.params
        if (!isNotFromMenu) {
            self.$emit('change-cp', {
                component: cpPath,
                title: cpTitle,
                navIndex: cpIndex,
                params: menuParams || null,
                pk: cpIndex,
                breadList: getBreadList(self, cpIndex)
            } as CpInfo)
        }
    }
}

export default {
    loglineObj,
    setPageTitle,
    getHotKeyStringList,
    sendReq,
    decodeParams,
    encodeParams,
    isUrl,
    randomCharacter,
    isRegExp,
    arrayRemove,
    getFirstComponentChild,
    isEmpty,
    getDeviceInfo,
    fullScreenCtl,
    getBreadList,
    handlerMenuSelect
}
