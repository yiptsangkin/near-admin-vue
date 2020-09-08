import apiUrl from './apiUrl'
import utils from '@corets/utils'
import {ReqType, ResType} from '@corets/type'

const getUserMenu = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserMenu
    const result = utils.sendReq(reqType)
    return result
}

const getUserInfo = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserInfo
    const result = utils.sendReq(reqType)
    return result
}

export default {
    getUserMenu,
    getUserInfo
}
