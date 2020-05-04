import {UserInfo} from '@ts/core/type'
import lang from '@ts/core/lang'
import comConfig, {ComConfig} from '@ts/custom/config'

const DEFAULT_MALE_AVATAR = `/static/images/common/default_handsome.jpg`
const DEFAULT_FEMALE_AVATAR = `/static/images/common/default_beauty.jpg`
const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

interface State {
    userInfo: UserInfo, // user info status
    locale: string,     // locale string
    gloablLocale: any,  // locale object
    comConfig: ComConfig
}

interface Getter {
    [key: string]: any
}

const state: State = {
    userInfo: {
        avatar: DEFAULT_MALE_AVATAR,
        userName: '',
        role: '',
        roleName: '',
        gender: 0
    },
    locale: CACHE_LOCALE,
    gloablLocale: lang.globalLocaleObj,
    comConfig
}

const getters: Getter = {
    userInfo: (getterState: State) => {
        return getterState.userInfo
    },
    locale: (getterState: State) => {
        return getterState.locale
    },
    gloablLocale: (getterState: State) => {
        return getterState.gloablLocale
    },
    comConfig: (getterState: State) => {
        return getterState.comConfig
    }
}

export default {
    state,
    getters
}
