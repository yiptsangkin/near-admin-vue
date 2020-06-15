import {UserInfo, MenuList, CpInfo, ClosePageOpt, UpdatePageOpt} from '@corets/type'
import {globalLocaleObj, i18nObj} from '@corets/lang'
import comConfig, {ComConfig} from '@custom/config'
import {ActionContext} from 'vuex'
import dict from '@custom/dict'
import utils from '@corets/utils'
import Vue from 'vue'

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'
const RDN_KEY = utils.randomCharacter(6)
const defaultTagList = [
    {
        component: 'home/HomePage',
        title: dict.localeObj.menuObj.defaultMenu.home,
        navIndex: '-1',
        pk: RDN_KEY,
        params: {
            isAffix: true
        }
    }
]

let cacheTagList
let cacheTagIndex

if (comConfig.buildSwitch.isCache) {
    cacheTagList = JSON.parse(localStorage.getItem('nearAdminTagList') || JSON.stringify(defaultTagList))
    cacheTagIndex = JSON.parse(localStorage.getItem('nearAdminTagIndex') || '0')
} else {
    cacheTagList = []
    cacheTagIndex = 0
}

const rmTagOp = (rmTagState: State, closeOpt: ClosePageOpt) => {
    const self = Vue.prototype
    const targetList: CpInfo[] = []
    switch (closeOpt.type) {
        case 'right':
            const rmLength = rmTagState.curTagList.length - 1 - closeOpt.idx
            // get affix tag in remove items
            for (let i = closeOpt.idx + 1; i < closeOpt.idx + rmLength + 1; i++) {
                const item = rmTagState.curTagList[i]
                if (item.params && item.params.isAffix) {
                    targetList.push(item)
                }
            }
            rmTagState.curTagList.splice(closeOpt.idx + 1, rmLength)
            // add affix items
            rmTagState.curTagList = rmTagState.curTagList.concat(targetList)
            if (!closeOpt.target || closeOpt.target === 0) {
                if (closeOpt.idx <= state.curTagIndex) {
                    rmTagState.curTagIndex = closeOpt.idx
                }
            } else {
                rmTagState.curTagIndex = closeOpt.target
            }
            break
        case 'other':
            // get affix tag in remove items
            for (let i = 1; i < rmTagState.curTagList.length; i++) {
                const item = rmTagState.curTagList[i]
                if (item.params && item.params.isAffix && i !== closeOpt.idx) {
                    targetList.push(item)
                }
            }
            if (closeOpt.idx === 0) {
                rmTagState.curTagList = [rmTagState.curTagList[0]]
                rmTagState.curTagIndex = 0
            } else {
                rmTagState.curTagList = [rmTagState.curTagList[0], rmTagState.curTagList[closeOpt.idx]]
                rmTagState.curTagIndex = 1
            }
            rmTagState.curTagList = rmTagState.curTagList.concat(targetList)
            break
        case 'all':
            // get affix tag in remove items
            for (let i = 1; i < rmTagState.curTagList.length; i++) {
                const item = rmTagState.curTagList[i]
                if (item.params && item.params.isAffix) {
                    targetList.push(item)
                }
            }
            rmTagState.curTagList = [rmTagState.curTagList[0]]
            rmTagState.curTagIndex = 0
            rmTagState.curTagList = rmTagState.curTagList.concat(targetList)
            break
        // default is type 'cur'
        default:
            const targetTag = rmTagState.curTagList[closeOpt.idx]
            if (targetTag.params && targetTag.params.isAffix) {
                self.$message.warn(i18nObj.$t(dict.localeObj.tagObj.errorTip.affixPageCloseError))
            } else {
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
    // change default index
    const curIndex = rmTagState.curTagList[rmTagState.curTagIndex].navIndex
    if (curIndex) {
        rmTagState.defaultIndexs = [curIndex]
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
    saveWarning: boolean,
    isFullScreen: boolean,
    isCpLoading: boolean
}

interface Getter {
    [key: string]: any
}

const state: State = {
    userInfo: {
        avatar: '',
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
    curTagList: cacheTagList,
    curTagIndex: cacheTagIndex,
    rightPathList: [],
    shrinkLeftMenu: false,
    saveWarning: false,
    isFullScreen: false,
    isCpLoading: true
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
    },
    isFullScreen: (getterSate: State) => {
        return getterSate.isFullScreen
    },
    isCpLoading: (getterSate: State) => {
        return getterSate.isCpLoading
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
            // set menu index to null
            if (cpInfo.navIndex) {
                mutationState.defaultIndexs = [cpInfo.navIndex]
            }
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
            let checkSaveFlag: boolean | undefined = false

            switch (closeOpt.type) {
                case 'right':
                    const rightList = mutationState.curTagList.slice(closeOpt.idx + 1, mutationState.curTagList.length)
                    for (const item of rightList) {
                        if (item.params && item.params.checkSave && !item.params.isAffix) {
                            checkSaveFlag = true
                            break
                        }
                    }
                    break
                case 'other':
                    for (let i = 1; i < mutationState.curTagList.length; i++) {
                        const item = mutationState.curTagList[i]
                        if (i !== closeOpt.idx && item.params && item.params.checkSave && !item.params.isAffix) {
                            checkSaveFlag = true
                            break
                        }
                    }
                    break
                case 'all':
                    for (let i = 1; i < mutationState.curTagList.length; i++) {
                        const item = mutationState.curTagList[i]
                        if (item.params && item.params.checkSave && !item.params.isAffix) {
                            checkSaveFlag = true
                            break
                        }
                    }
                    break
                default:
                    checkSaveFlag = curOpCp.params && curOpCp.params.checkSave && !curOpCp.params.isAffix
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
    updateCurTag: (mutationState: State, updatePageOpt: UpdatePageOpt) => {
        for (const key of Object.keys(updatePageOpt.updateCpInfo)) {
            // @ts-ignore
            mutationState.curTagList[updatePageOpt.idx][key] = updatePageOpt.updateCpInfo[key]
        }
    },
    changeCurTagIndex: (mutationState: State, tagIndex: number) => {
        mutationState.curTagIndex = tagIndex
    },
    changeShrinkLeftMenu: (mutationState: State, isShrink: boolean) => {
        mutationState.shrinkLeftMenu = isShrink
    },
    changeUserInfo: (mutationState: State, userInfo: UserInfo) => {
        mutationState.userInfo = userInfo
    },
    changeRightPathList: (mutationState: State, rightPathList: string[]) => {
        mutationState.rightPathList = rightPathList
    },
    changeFullScreen: (mutationState: State, fullScreen: boolean) => {
        mutationState.isFullScreen = fullScreen
    },
    changeCpLoading: (mutationState: State, isCpLoading: boolean) => {
        mutationState.isCpLoading = isCpLoading
    }
}

const actions = {
    changeLocale: (context: ActionContext<State, State>, locale: string) => {
        context.commit('changeLocale', locale)
    },
    changeMenu: (context: ActionContext<State, State>, menuObj: MenuList) => {
        context.commit('changeMenu', menuObj)
    },
    changeUserInfo: (context: ActionContext<State, State>, userObj: UserInfo) => {
        context.commit('changeUserInfo', userObj)
    },
    changeCurMenu: (context: ActionContext<State, State>, curMenu: number[]) => {
        context.commit('changeCurMenu', curMenu)
    },
    changeDefaultIndexs: (context: ActionContext<State, State>, curSideMenu: string[]) => {
        context.commit('changeDefaultIndexs', curSideMenu)
    },
    changeTag: (context: ActionContext<State, State>, tagOp: any) => {
        if (tagOp.op === 'add') {
            context.state.isCpLoading = true
            context.commit('addCurTag', tagOp.cpInfo)
        } else if (tagOp.op === 'remove') {
            context.commit('removeCurTag', tagOp.closeOpt)
        } else if (tagOp.op === 'update') {
            if (tagOp.updateOpt.updateCpInfo.pk) {
                context.state.isCpLoading = true
            }
            context.commit('updateCurTag', tagOp.updateOpt)
        }
        // cache tag component
        if (comConfig.buildSwitch.isCache) {
            localStorage.setItem('nearAdminTagList', JSON.stringify(context.state.curTagList))
        }
    },
    changeCurTagIndex: (context: ActionContext<State, State>, tagIndex: number) => {
        context.commit('changeCurTagIndex', tagIndex)
    },
    changeShrinkLeftMenu: (context: ActionContext<State, State>, isShrink: boolean) => {
        context.commit('changeShrinkLeftMenu', isShrink)
    },
    changeRightPathList: (context: ActionContext<State, State>, rightPathList: string[]) => {
        context.commit('changeRightPathList', rightPathList)
    },
    changeFullScreen: (context: ActionContext<State, State>, fullScreen: boolean) => {
        context.commit('changeFullScreen', fullScreen)
    },
    changeCpLoading: (context: ActionContext<State, State>, isCpLoading: boolean) => {
        context.commit('changeCpLoading', isCpLoading)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
