import apiUrl from './apiUrl'
import utils from '@corets/utils'
import {ReqType, ResType} from '@corets/type'

const getSendMsg = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getSendMsg
    const result = utils.sendReq(reqType)
    return result
}

const checkLoginByAccount = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.checkLoginByAccount
    const result = utils.sendReq(reqType)
    return result
}

const checkLoginByPhone = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.checkLoginByPhone
    const result = utils.sendReq(reqType)
    return result
}

export default {
    getSendMsg,
    checkLoginByAccount,
    checkLoginByPhone
}
