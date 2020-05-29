import {UserInfo, MenuList, CpInfo} from '@corets/type'
import lang from '@corets/lang'
import comConfig, {ComConfig} from '@custom/config'
import {ActionContext} from 'vuex'
import dict from '@custom/dict';
import utils from '@corets/utils';

const DEFAULT_MALE_AVATAR = `/static/images/common/default_handsome.jpg`
const DEFAULT_FEMALE_AVATAR = `/static/images/common/default_beauty.jpg`
const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'
const RDN_KEY = utils.randomCharacter(6)

interface State {
    userInfo: UserInfo, // user info status
    locale: string,     // locale string
    gloablLocale: any,  // locale object
    comConfig: ComConfig,
    menuObj: MenuList,
    curMenu: number[],
    defaultIndexs: string[],
    curTagList: CpInfo[],
    curTagIndex: number,
    rightPathList: string[]
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
    defaultIndexs: [],
    curTagList: [
        {
            component: 'home/HomePage',
            title: dict.localeObj.menuObj.defaultMenu.home,
            navIndex: '-1',
            pk: RDN_KEY,
            cacheName: `HomePage-${RDN_KEY}`
        }
    ],
    curTagIndex: 0,
    rightPathList: ['demo/HelloWorld', 'demo/HelloWorld2']
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
    },
    curTagList: (getterState: State) => {
        return getterState.curTagList
    },
    curTagIndex: (getterState: State) => {
        return getterState.curTagIndex
    },
    rightPathList: (getterState: State) => {
        return getterState.rightPathList
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
    },
    addCurTag: (mutationState: State, cpInfo: CpInfo) => {
        mutationState.curTagList.push(cpInfo)
    },
    removeCurTag: (mutationState: State, cpInfo: CpInfo) => {
        if (cpInfo.idx || cpInfo.idx === 0) {
            mutationState.curTagList.splice(cpInfo.idx, 1)
        }
    },
    updateCurTag: (mutationState: State, cpInfo: CpInfo) => {
        if (cpInfo.idx || cpInfo.idx === 0) {
            mutationState.curTagList[cpInfo.idx] = cpInfo
        }
    },
    changeCurTagIndex: (mutationState: State, tagIndex: number) => {
        mutationState.curTagIndex = tagIndex
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
    },
    changeTag: (context: ActionContext<State, State>, tagOp: any) => {
        if (tagOp.op === 'add') {
            context.commit('addCurTag', tagOp.cpInfo)
        } else if (tagOp.op === 'remove') {
            context.commit('removeCurTag', tagOp.cpInfo)
        } else if (tagOp.op === 'update') {
            context.commit('updateCurTag', tagOp.cpInfo)
        }
    },
    changeCurTagIndex: (context: ActionContext<State, State>, tagIndex: number) => {
        context.commit('changeCurTagIndex', tagIndex)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
