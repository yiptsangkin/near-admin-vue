import Logline from 'logline'
import {HadKey, ReqType, LoglineParams, CpInfo, NavList, GetLoglineParams, UserInfo} from '@corets/type';
import axios, {AxiosRequestConfig} from 'axios'
import dict from '@custom/dict'
import Vue from 'vue'
import md5 from 'js-md5'
import qs from 'qs'
import comConfig from '@custom/config'
const coreLocale = require('@corets/locale_BASE')
import {
    message
} from 'ant-design-vue'
import moment from 'moment'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

axios.interceptors.request.use(
    (config: any) => {
        NProgress.start()
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
     (response: any) => {
        NProgress.done()
        // check if headers had local-cache
        if (response.config.headers && response.config.headers['local-cache']) {
            // try to get cache by params cache id
            let params
            if (response.config.method === 'get' || response.config.method === 'delete') {
                params = response.config.params ? (typeof response.config.params === 'string' ? response.config.params : JSON.stringify(response.config.params)) : ''
            } else {
                params = response.config.data ? (typeof response.config.data === 'string' ? response.config.data : JSON.stringify(response.config.data)) : ''
            }
            const url = response.config.url
            const cacheId = `near_cache_${md5([params, url].join('@cache@'))}`
            return dealReqCache(cacheId, response)
        } else {
            return response
        }
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

const showErrorMessage = (errors: any) => {
    const errorsType = typeof errors
    if (errorsType === 'string') {
        message.error(errors)
    } else {
        const errorsList = []
        for (const key of Object.keys(errors)) {
            const item = errors[key]
            errorsList.push(`${key}：${item}`)
        }
        message.error(errorsList.join('；'))
    }
}

const setReqCache = (cacheId: string, data: any) => {
    let dataString
    try {
        dataString = JSON.stringify(data)
        localStorage.setItem(cacheId, dataString)
    } catch (e) {
        localStorage.setItem(cacheId, data)
    }
}

const getReqCache = (cacheId: string, queryUrl: string) => {
    const cacheData = localStorage.getItem(cacheId)
    if (cacheData) {
        console.log(`%c '${queryUrl}': this request's response data is from local cache.`, 'color: red;')
        return JSON.parse(cacheData)
    } else {
        return false
    }
}

const dealReqCache = (cacheId: string, response: any) => {
    // cache local res data
    try {
        setReqCache(cacheId, response)
        return response
    } catch (e) {
        if (/Failed to execute 'setItem' on 'Storage'/.test(e)) {
            // need to clean cache storage
            for (const key of Object.keys(localStorage)) {
                if (/near_cache/.test(key)) {
                    localStorage.removeItem(key)
                }
            }
            // set and return data
            setReqCache(cacheId, response)
            return response
        } else {
            loglineObj.setLog({
                logType: 'error',
                desc: 'storage fail',
                data: {
                    message: e
                }
            })
            return response
        }
    }
}

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
    getLog ({start, end, callback}: GetLoglineParams) {
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
    // if formdata, transfer data
    if (params.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        params.data = qs.stringify(params.data)
    }
    const rCfg: AxiosRequestConfig = {
        headers: params.headers,
        responseType: params.responseType,
        timeout: params.timeout
    }
    let result: any
    if (params.headers['local-cache']) {
        const data = params.data ? JSON.stringify(params.data) : ''
        const url = params.url
        const cacheId = `near_cache_${md5([data, url].join('@cache@'))}`
        result = getReqCache(cacheId, url)
    }
    if (params.method === 'POST') {
        try {
            if (!result) {
                result = await axios.post(params.url, params.data, rCfg)
            }
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
                    showErrorMessage(resData.errors)
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
            if (!result) {
                result = await axios.get(params.url, getParams)
            }
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
                    showErrorMessage(resData.errors)
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
            if (!result) {
                result = await axios.put(params.url, params.data, rCfg)
            }
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
                    showErrorMessage(resData.errors)
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
            if (!result) {
                result = await axios.delete(params.url, getParams)
            }
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
                    showErrorMessage(resData.errors)
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
    const [topMenu, asideMenu] = navIndex.split('-sub-')
    let asideMenuIndexList
    const [, topMenuIndex, asideMenuIndex] = topMenu.split('-')
    if (asideMenu) {
        asideMenuIndexList = asideMenu.split('-')
    } else {
        asideMenuIndexList = [asideMenuIndex]
    }
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
        const [topMenu, asideMenu] = navIndex.split('-sub-')
        let asideMenuIndexList
        const [, topMenuIndex, asideMenuIndex] = topMenu.split('-')
        if (asideMenu) {
            asideMenuIndexList = asideMenu.split('-')
        } else {
            asideMenuIndexList = [asideMenuIndex]
        }

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

const timestampToDateString = (
    stamp: number | string,
    gap: string,
    isToday: boolean,
    isObj: boolean,
    withoutMinSec: boolean
) => {
    if (typeof stamp === 'string') {
        // for transfer string to timestamp, and fix osx or ios bug
        stamp = new Date(stamp.replace(/-/g, '/')).getTime()
    }

    const date = new Date(stamp)
    const year = date.getFullYear()
    const month = formatTwice(date.getMonth() + 1)
    const day = formatTwice(date.getDate())
    const hour = formatTwice(date.getHours())
    const minutes = formatTwice(date.getMinutes())
    const seconds = formatTwice(date.getSeconds())

    if (!isToday) {
        if (isObj) {
            return {year, month, day, hour, minutes, seconds}
        } else {
            if (withoutMinSec) {
                return [year, month, day].join(gap)
            } else {
                return `${[year, month, day].join(gap)} ${[hour, minutes].join(':')}`
            }
        }
    } else {
        // 获取今天的时间戳范围
        const toady = new Date()
        const toadyStartStamp = new Date(
            `${[toady.getFullYear(), toady.getMonth() + 1, toady.getDate()].join('/')} 00:00:00`
        ).getTime()
        const toadyEndStamp = toadyStartStamp + 24 * 60 * 60 * 1000

        if (stamp >= toadyStartStamp && stamp <= toadyEndStamp) {
            if (withoutMinSec) {
                return '今天'
            } else {
                return `今天 ${[hour, minutes].join(':')}`
            }
        } else {
            if (isObj) {
                return {year, month, day, hour, minutes, seconds}
            } else {
                if (withoutMinSec) {
                    return [year, month, day].join(gap)
                } else {
                    return `${[year, month, day].join(gap)} ${[hour, minutes].join(':')}`
                }
            }
        }
    }
}
const formatTwice = (str: number) => {
    let temStr = str.toString()
    temStr = temStr.length === 2 ? temStr : `0${temStr}`
    return temStr
}

const exportExcel = (columnList: string[], dataList: any[], fileName: string) => {
    let ctx = ''
    columnList.forEach((item: string) => {
        ctx = ctx + `<td>${item}</td>`
    })
    ctx = `<tr>${ctx}</tr>`

    dataList.forEach((item) => {
        ctx += '<tr>'
        for (const key of Object.keys(item)) {
            ctx += `<td>${item[key] + '\t'}</td>`
        }
        ctx += '</tr>'
    })

    const worksheet = fileName
    const uri = 'data:application/vnd.ms-excel;base64,'

    const tpl = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${ctx}</table></body></html>`

    const link = document.createElement('a')
    link.href = uri + toBase64(tpl)
    link.download = `download_${timestampToDateString(new Date().getTime(), '-', false, false, true)}_${fileName}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const toBase64 = (str: string) => {
    return window.btoa(unescape(encodeURIComponent(str)))
}

const getObjAttrByStr = (obj: any, path: string) => {
    if (!obj || !path) {
        return null
    } else {
        const pathList = path.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
        let result: any = null
        try {
            pathList.forEach((item) => {
                if (result === null) {
                    result = obj[item]
                } else {
                    result = result[item]
                }
            })
            return result
        } catch (e) {
            return null
        }
    }
}

const getLocaleIfI18nOff = (str: string) => {
    if (!comConfig.buildSwitch.isI18n) {
        return getObjAttrByStr(coreLocale, str) || str
    } else {
        return str
    }
}

const getMenuRootCp = (menuList: NavList[], isObj?: boolean, replaceField = {title: 'name'}, targetMenu?: any[]) => {
    let rightPathList: any[] = []
    menuList.forEach((item: any, index: number) => {
        if (isEmpty(item.child) && !isEmpty(item.path)) {
            if (isObj) {
                const key = `Customer-Entry-${index}-${item[replaceField.title]}`
                if (targetMenu) {
                    if (targetMenu.indexOf(key) !== -1) {
                        rightPathList.push({
                            key,
                            path: item.path,
                            title: item[replaceField.title]
                        })
                    }
                } else {
                    rightPathList.push({
                        key,
                        path: item.path,
                        title: item[replaceField.title]
                    })
                }

            } else {
                rightPathList.push(item.path)
            }
        } else if (!isEmpty(item.child) && isEmpty(item.path)) {
            rightPathList = rightPathList.concat(getMenuRootCp(item.child, isObj, replaceField, targetMenu))
        }
    })
    return rightPathList
}

const getUrlParam = (name: string) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r !== null) {
        return unescape(r[2])
    }
    return null
}

const getCurrentToken = () => {
    let userInfo: any = localStorage.getItem('userInfo') || '{}'
    userInfo = JSON.parse(userInfo)
    const urlToken = getUrlParam('token') || getUrlParam('ssoTokenId')
    return userInfo.oauthToken || urlToken
}

const buildFilterConds = (obj: any) => {
    const filterConds = []
    for (const key of Object.keys(obj)) {
        if (obj[key]) {
            filterConds.push({
                fieldName: key,
                fieldStringValue: obj[key]
            })
        }
    }
    return filterConds
}

const nextFocus = (dom = document.activeElement) => {
    const parentNode = getParents(dom, '.n-form')
    const inputSelectList = parentNode.querySelectorAll('.ant-input, .ant-select')
    for (let i = 0; i < inputSelectList.length; i++) {
        const item: any = inputSelectList[i]
        const nextItem: any = inputSelectList[i + 1]
        if (item === dom) {
            if (nextItem) {
                if (/disabled/g.test(nextItem.getAttribute('class'))) {
                    nextFocus(nextItem)
                } else {
                    nextItem.focus()
                    nextItem.click()
                    break
                }
            } else {
                item.blur()
            }
        }
    }
}

const getParents = (el: any, parentSelect: string): any => {
    const parentNode = el?.parentNode || document
    const childNode = parentNode.querySelector(parentSelect)
    if (childNode) {
        return childNode
    } else {
        return getParents(parentNode, parentSelect)
    }
}

const refToCamel = (val: string) => {
    const refList = val.split('-')
    refList.forEach((item, index) => {
        if (index !== 0) {
            const firstCase = item[0]?.toUpperCase()
            refList[index] = `${firstCase}${item.substr(1, item.length - 1)}`
        }
    })
    return refList.join('')
}

const getGapDate = ({date = new Date(), gap = 7, gapType = 'days', format = 'YYYY-MM-DD HH:mm:ss', isString = false, isStart = true}: {date?: Date, gap?: any, gapType?: any, format?: string, isString?: boolean, isStart?: boolean} = {}) => {
    let startMomentDate: any
    let endMomentDate: any
    if (isStart) {
        startMomentDate = moment(date).startOf('day')
        endMomentDate = moment(date).endOf('day')
    } else {
        startMomentDate = moment(date)
        endMomentDate = moment(date)
    }
    if (isString) {
        return [startMomentDate.subtract(gap as any, gapType).format(format), endMomentDate.format(format)]
    } else {
        return [startMomentDate.subtract(gap as any, gapType), endMomentDate]
    }
}

const fUpperCase = (val: string) => {
    return val.toUpperCase()
}
const fNumber = (val: string) => {
    return val.match(/[0-9]/g)?.join('').substr(0, 11)
}

const fPhone = (val: string) => {
    return val.match(/^1[3-9]\d{9}$/g)?.join('')
}
const fEmail = (val: string) => {
    return val.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/g)?.join('')
}

const formatMoment = (obj: any, format = 'YYYY-MM-DD') => {
    const temObj = Object.assign({}, obj)
    for (const key of Object.keys(temObj)) {
        if (temObj[key]?._isAMomentObject) {
            temObj[key] = temObj[key].format(format)
        }
    }
    return temObj
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
    handlerMenuSelect,
    timestampToDateString,
    exportExcel,
    getObjAttrByStr,
    getLocaleIfI18nOff,
    getMenuRootCp,
    getUrlParam,
    getCurrentToken,
    buildFilterConds,
    nextFocus,
    fUpperCase,
    fNumber,
    fPhone,
    fEmail,
    refToCamel,
    getGapDate,
    getParents,
    formatMoment
}
