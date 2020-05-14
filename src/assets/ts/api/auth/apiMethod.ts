import apiUrl from './apiUrl'
import utils from '@core/utils'
import {ReqType, ResType} from '@core/type'

const getSendMsg = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getSendMsg
    return await utils.sendReq(reqType)
}

const checkLoginByAccount = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.checkLoginByAccount
    return await utils.sendReq(reqType)
}

const checkLoginByPhone = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.checkLoginByPhone
    return await utils.sendReq(reqType)
}

export default {
    getSendMsg,
    checkLoginByAccount,
    checkLoginByPhone
}
