import comConfig from '@custom/config';

const apiHost = comConfig.apiHost

export default {
    getUserMenu: `${apiHost}/mock-data/getUserMenu`,
    getUserInfo: `${apiHost}/mock-data/getUserInfo`
}
