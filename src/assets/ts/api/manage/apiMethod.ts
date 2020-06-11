import apiUrl from './apiUrl'
import utils from '@corets/utils'
import {ReqType, ResType} from '@corets/type'

const getUserMenu = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserMenu
    const result = await utils.sendReq(reqType)
    return result
}

const getUserInfo = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserInfo
    const result = await utils.sendReq(reqType)
    return result
}

export default {
    getUserMenu,
    getUserInfo
}
