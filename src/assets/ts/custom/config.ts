import apiConfig from 'apiConfig'
import {ComConfig} from '@core/type'

const sysInfo = {
    name: 'Near-Admin',
    logo: '/static/images/logo/logo.svg',
    description: '一款基于Vue和Ant Design的好用中后台前端开发框架',
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
