import apiConfig from 'apiConfig'
import {ComConfig} from '@core/type'
import dict from '@custom/dict';

const sysInfo = {
    name: 'Near-Admin',
    logo: '/static/images/logo/logo.svg',
    description: dict.localeObj.sysInfo.sysIntro,
    appId: apiConfig.appId,
    appSecret: apiConfig.appSecret,
    apiHost: apiConfig.apiHost,
    noNeedCheckRightPath: ['core/home/HomePage', 'core/setting/Setting', 'core/logline/Logline']
}

const buildSwitch = {
    isMock: true,
    isHotKey: true,
    isBreadCrumb: true
}

const comConfig: ComConfig = {
    sysInfo,
    buildSwitch
}

export default comConfig
export {
    ComConfig
}
