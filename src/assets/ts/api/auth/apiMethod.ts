import apiUrl from './apiUrl'
import utils from '@core/utils'
import {ReqType, ResType} from '@core/type'

const getSendMsg = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getSendMsg
    const result = await utils.sendReq(reqType)
    return result
}

const checkLoginByAccount = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.checkLoginByAccount
    const result = await utils.sendReq(reqType)
    return result
}

const checkLoginByPhone = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.checkLoginByPhone
    const result = await utils.sendReq(reqType)
    return result
}

export default {
    getSendMsg,
    checkLoginByAccount,
    checkLoginByPhone
}
