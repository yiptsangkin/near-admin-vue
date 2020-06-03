import {UserInfo, MenuList, CpInfo, ClosePageOpt} from '@corets/type'
import {globalLocaleObj, i18nObj} from '@corets/lang'
import comConfig, {ComConfig} from '@custom/config'
import {ActionContext} from 'vuex'
import dict from '@custom/dict'
import utils from '@corets/utils'
import Vue from 'vue'

const DEFAULT_MALE_AVATAR = `/static/images/common/default_handsome.jpg`
const DEFAULT_FEMALE_AVATAR = `/static/images/common/default_beauty.jpg`
const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'
const RDN_KEY = utils.randomCharacter(6)

const rmTagOp = (rmTagState: State, closeOpt: ClosePageOpt) => {
    switch (closeOpt.type) {
        case 'right':
            const rmLength = rmTagState.curTagList.length - 1 - closeOpt.idx
            rmTagState.curTagList.splice(closeOpt.idx + 1, rmLength)
            if (!closeOpt.target || closeOpt.target === 0) {
                if (closeOpt.idx <= state.curTagIndex) {
                    rmTagState.curTagIndex = closeOpt.idx
                }
            } else {
                rmTagState.curTagIndex = closeOpt.target
            }
            break
        case 'other':
            if (closeOpt.idx === 0) {
                rmTagState.curTagList = [rmTagState.curTagList[0]]
                rmTagState.curTagIndex = 0
            } else {
                rmTagState.curTagList = [rmTagState.curTagList[0], rmTagState.curTagList[closeOpt.idx]]
                rmTagState.curTagIndex = 1
            }
            break
        case 'all':
            rmTagState.curTagList = [rmTagState.curTagList[0]]
            rmTagState.curTagIndex = 0
            break
        // default is type 'cur'
        default:
            rmTagState.curTagList.splice(closeOpt.idx, 1)
            if (!closeOpt.target || closeOpt.target === 0) {
                if (closeOpt.idx <= state.curTagIndex) {
                    rmTagState.curTagIndex--
                }
            } else {
                rmTagState.curTagIndex = closeOpt.target
            }
    }
}

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
    rightPathList: string[],
    shrinkLeftMenu: boolean,
    saveWarning: boolean
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
    gloablLocale: globalLocaleObj,
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
            pk: RDN_KEY
        }
    ],
    curTagIndex: 0,
    rightPathList: [],
    shrinkLeftMenu: false,
    saveWarning: false
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
    },
    shrinkLeftMenu: (getterState: State) => {
        return getterState.shrinkLeftMenu
    },
    saveWarning: (getterSate: State) => {
        return getterSate.saveWarning
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
        // insert after cur tag index
        if (cpInfo.params && cpInfo.params.apiNew) {
            // if api new page, add it to the last tag
            mutationState.curTagList.push(cpInfo)
            mutationState.curTagIndex = mutationState.curTagList.length - 1
        } else {
            // else add it the cur tag' next position
            mutationState.curTagList.splice(mutationState.curTagIndex + 1, 0, cpInfo)
            mutationState.curTagIndex++
        }
    },
    removeCurTag: (mutationState: State, closeOpt: ClosePageOpt) => {
        const self = Vue.prototype
        if (closeOpt.idx || closeOpt.idx === 0) {
            // alert if check save or not
            const curOpCp = mutationState.curTagList[closeOpt.idx]
            let checkSaveFlag = false

            switch (closeOpt.type) {
                case 'cur':
                    checkSaveFlag = curOpCp.params && curOpCp.params.checkSave
                    break
                case 'right':
                    const rightList = mutationState.curTagList.slice(closeOpt.idx + 1, mutationState.curTagList.length)
                    for (const item of rightList) {
                        if (item.params && item.params.checkSave) {
                            checkSaveFlag = true
                            break
                        }
                    }
                    break
                case 'other':
                    for (let i = 1; i < mutationState.curTagList.length; i++) {
                        const item = mutationState.curTagList[i]
                        if (i !== closeOpt.idx && item.params && item.params.checkSave) {
                            checkSaveFlag = true
                            break
                        }
                    }
                    break
                case 'all':
                    for (let i = 1; i < mutationState.curTagList.length; i++) {
                        const item = mutationState.curTagList[i]
                        if (item.params && item.params.checkSave) {
                            checkSaveFlag = true
                            break
                        }
                    }
                    break
            }

            if (checkSaveFlag) {
                mutationState.saveWarning = true
                self.$confirm({
                    content: i18nObj.$t(dict.localeObj.tagObj.checkSave),
                    onOk () {
                        rmTagOp(mutationState, closeOpt)
                        mutationState.saveWarning = false
                    },
                    onCancel () {
                        self.$message.info(i18nObj.$t(dict.localeObj.tagObj.cancelClose))
                        mutationState.saveWarning = false
                    }
                })
            } else {
                rmTagOp(mutationState, closeOpt)
            }
        }
    },
    updateCurTag: (mutationState: State, cpInfo: CpInfo) => {
        console.log(cpInfo)
    },
    changeCurTagIndex: (mutationState: State, tagIndex: number) => {
        mutationState.curTagIndex = tagIndex
    },
    changeShrinkLeftMenu: (mutationState: State, isShrink: boolean) => {
        mutationState.shrinkLeftMenu = isShrink
    },
    chageSaveWarning: (mutationState: State, saveWarning: boolean) => {
        mutationState.saveWarning = saveWarning
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
            context.commit('removeCurTag', tagOp.closeOpt)
        } else if (tagOp.op === 'update') {
            context.commit('updateCurTag', tagOp.cpInfo)
        }
    },
    changeCurTagIndex: (context: ActionContext<State, State>, tagIndex: number) => {
        context.commit('changeCurTagIndex', tagIndex)
    },
    changeShrinkLeftMenu: (context: ActionContext<State, State>, isShrink: boolean) => {
        context.commit('changeShrinkLeftMenu', isShrink)
    },
    chageSaveWarning: (context: ActionContext<State, State>, saveWarning: boolean) => {
        context.commit('chageSaveWarning', saveWarning)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
