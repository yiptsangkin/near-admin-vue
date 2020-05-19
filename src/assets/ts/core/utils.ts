import Logline from 'logline'
import {HadKey, ReqType, LoglineParams} from '@core/type'
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
    keyStringList.push(e.key)
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

export default {
    loglineObj,
    setPageTitle,
    getHotKeyStringList,
    sendReq
}
