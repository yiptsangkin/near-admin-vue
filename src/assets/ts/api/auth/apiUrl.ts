import comConfig from '@custom/config';

const apiHost = comConfig.apiHost

export default {
    getSendMsg: `${apiHost}/mock-data/getSendMsg`,
    checkLoginByAccount: `${apiHost}/mock-data/checkLoginByAccount`,
    checkLoginByPhone: `${apiHost}/mock-data/checkLoginByPhone`
}
