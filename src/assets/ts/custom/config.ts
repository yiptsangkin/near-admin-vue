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

let buildSwitch

const cacheConfig = localStorage.getItem('nearAdminCacheConfig')

try {
    if (cacheConfig) {
        buildSwitch = JSON.parse(cacheConfig)
    } else {
        buildSwitch = {
            isMock: true,
            isHotKey: true,
            isBreadCrumb: true,
            isCache: true,
            isI18n: true
        }
    }
} catch (e) {
    buildSwitch = {
        isMock: true,
        isHotKey: true,
        isBreadCrumb: true,
        isCache: true,
        isI18n: true
    }
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
