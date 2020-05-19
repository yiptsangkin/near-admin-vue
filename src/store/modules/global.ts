import {UserInfo, MenuList} from '@core/type'
import lang from '@core/lang'
import comConfig, {ComConfig} from '@custom/config'
import {ActionContext} from 'vuex'

const DEFAULT_MALE_AVATAR = `/static/images/common/default_handsome.jpg`
const DEFAULT_FEMALE_AVATAR = `/static/images/common/default_beauty.jpg`
const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

interface State {
    userInfo: UserInfo, // user info status
    locale: string,     // locale string
    gloablLocale: any,  // locale object
    comConfig: ComConfig,
    menuObj: MenuList,
    curMenu: number[],
    defaultIndexs: string[]
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
    comConfig,
    menuObj: {
        menuList: []
    },
    curMenu: [0],
    defaultIndexs: []
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
    },
    menuObj: (getterState: State) => {
        return getterState.menuObj
    },
    curMenu: (getterState: State) => {
        return getterState.curMenu
    },
    defaultIndexs: (getterState: State) => {
        return getterState.defaultIndexs
    }
}

const mutations = {
    changeLocale: (mutationState: State, locale: string) => {
        mutationState.locale = locale
    },
    changeMenu: (mutationState: State, menuObj: MenuList) => {
        mutationState.menuObj = menuObj
    },
    changeCurMenu: (mutationState: State, curMenu: number[]) => {
        mutationState.curMenu = curMenu
    },
    changeDefaultIndexs: (mutationState: State, curSideMenu: string[]) => {
        mutationState.defaultIndexs = curSideMenu
    }
}

const actions = {
    changeLocale: (context: ActionContext<State, State>, locale: string) => {
        context.commit('changeLocale', locale)
    },
    changeMenu: (context: ActionContext<State, State>, menuObj: MenuList) => {
        context.commit('changeMenu', menuObj)
    },
    changeCurMenu: (context: ActionContext<State, State>, curMenu: number[]) => {
        context.commit('changeCurMenu', curMenu)
    },
    changeDefaultIndexs: (context: ActionContext<State, State>, curSideMenu: string[]) => {
        context.commit('changeDefaultIndexs', curSideMenu)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
