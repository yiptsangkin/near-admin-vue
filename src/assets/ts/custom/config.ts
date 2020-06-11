import apiConfig from 'apiConfig'
import {ComConfig} from '@corets/type'
import dict from '@custom/dict';

const sysInfo = {
    name: 'Near-Admin',
    logo: '/static/images/logo/logo.svg',
    description: dict.localeObj.sysInfo.sysIntro,
    appId: apiConfig.appId,
    appSecret: apiConfig.appSecret,
    apiHost: apiConfig.apiHost,
    noNeedCheckRightPath: ['home/HomePage', 'setting/Setting', 'logline/Logline', 'WebView']
}

const buildSwitch = {
    isMock: true,
    isHotKey: true,
    isBreadCrumb: true,
    isCache: true
}

const comConfig: ComConfig = {
    apiHost: apiConfig.apiHost,
    sysInfo,
    buildSwitch
}

export default comConfig
export {
    ComConfig
}
