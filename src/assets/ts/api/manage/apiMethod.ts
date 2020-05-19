import apiUrl from './apiUrl'
import utils from '@core/utils'
import {ReqType, ResType} from '@core/type'

const getUserMenu = async (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserMenu
    const result = await utils.sendReq(reqType)
    return result
}

export default {
    getUserMenu
}
