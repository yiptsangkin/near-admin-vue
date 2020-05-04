import apiConfig from 'apiConfig'

interface SysInfo {
    name: string,          // system name
    appId?: string,        // system app id
    appSecret?: string,    // system app secret
    apiHost: string,       // system api host
    noNeedCheckRightPath: string[]   // no need to check if user have rigth to visit
}

interface BuildSwitch {
    isMock: boolean,    // if use local mock
    isHotKey: boolean,  // if use global hot key
    isBreadCrumb: boolean    // if show bread crumb
}

interface ComConfig {
    sysInfo: SysInfo,
    buildSwitch: BuildSwitch
}

const sysInfo = {
    name: 'near-admin',
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
