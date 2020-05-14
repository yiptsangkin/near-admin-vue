import comConfig from '@custom/config'
import mockData from 'mockjs'
import {getSendMsg, checkLoginByAccount, checkLoginByPhone} from '@mock/data/common'

if (comConfig.buildSwitch.isMock) {
    mockData.mock(/\/mock-data\/getSendMsg/, getSendMsg)
    mockData.mock(/\/mock-data\/checkLoginByAccount/, checkLoginByAccount)
    mockData.mock(/\/mock-data\/checkLoginByPhone/, checkLoginByPhone)
}

export default mockData
