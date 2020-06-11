import comConfig from '@custom/config'
import mockData from 'mockjs'
import {getSendMsg, checkLoginByAccount, checkLoginByPhone, getUserMenu, getUserInfo} from '@mock/data/common'

if (comConfig.buildSwitch.isMock) {
    mockData.mock(/\/mock-data\/getSendMsg/, getSendMsg)
    mockData.mock(/\/mock-data\/checkLoginByAccount/, checkLoginByAccount)
    mockData.mock(/\/mock-data\/checkLoginByPhone/, checkLoginByPhone)
    mockData.mock(/\/mock-data\/getUserMenu/, getUserMenu)
    mockData.mock(/\/mock-data\/getUserInfo/, getUserInfo)
}

export default mockData
