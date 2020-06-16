<template>
    <div class="n-manage-ctx">
        <a-layout class="n-layout-wrp">
            <n-header></n-header>
            <a-layout>
                <n-aside @change-cp="changeCp"></n-aside>
                <a-layout-content class="n-layout-content">
                    <n-tag-content-menu @single="singlePage" @refresh="refreshPage" @affix="affixPage"></n-tag-content-menu>
                    <n-tag @change-cp="changeCp"></n-tag>
                    <n-bread-crumb @change-cp="changeCp"
                                   :cp-bread="curTagList[curTagIndex].breadList"
                                   v-if="comConfig.buildSwitch.isBreadCrumb && curTagList[curTagIndex].breadList && curTagList[curTagIndex].breadList.length > 0">

                    </n-bread-crumb>
                    <div class="n-component-page">
                        <a-spin :spinning="isCpLoading" class="n-cp-loading">
                            <n-keep-alive ref="keep-alive-cp" :include="cacheCp">
                                <component
                                        ref="active-cp"
                                        :is="activeComponent"
                                        :key="curTagList[curTagIndex].pk"
                                        :cp-params="curTagList[curTagIndex].params"
                                        :page-path="curTagList[curTagIndex].component"
                                        @load="closeCpLoading"
                                ></component>
                            </n-keep-alive>
                        </a-spin>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">

    // @ts-nocheck

    import Vue from 'vue'
    import CoreManageBase from '@corets/mbase'
    import ManageBase from '@custom/mbase'
    import NAside from '@corecp/NAside.vue'
    import NHeader from '@corecp/NHeader.vue'
    import NBreadCrumb from '@corecp/NBreadCrumb.vue'
    import NTag from '@corecp/NTag.vue'
    import NTagContentMenu from '@corecp/./NTagContentMenu.vue'
    import NoRight from '@corecp/NNoRight.vue'
    import NoFound from '@corecp/NNoFound.vue'
    import NKeepAlive from '@corecp/NKeepAlive.vue'
    import {CacheRouteConfig, CpInfo} from '@corets/type'
    import utils from '@corets/utils'
    import {mapActions, mapGetters} from 'vuex'
    import comConfig from '@custom/config'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'NManage',
        mixins: [CoreManageBase, ManageBase],
        components: {
            NAside,
            NHeader,
            NTag,
            NKeepAlive,
            NTagContentMenu,
            NBreadCrumb
        },
        computed: {
            ...mapGetters([
                'isCpLoading',
                'curTagList',
                'curTagIndex',
                'rightPathList'
            ]),
            cacheCp () {
                const self = this as any
                return self.curTagList.map((e: CpInfo) => {
                    if (!(e.params && e.params.withoutCache)) {
                        return `${e.pk}`
                    }
                }).toString()
            }
        },
        asyncComputed: {
            async activeComponent () {
                const self = this as any
                let activeCp
                const curCp = self.curTagList[self.curTagIndex]
                // check right path
                const ableList = self.rightPathList.concat(comConfig.sysInfo.noNeedCheckRightPath)
                if (curCp.component) {
                    // is created by directive
                    const isApiNew = curCp.params ? curCp.params.apiNew : false
                    if (
                        ableList.indexOf(curCp.component) !== -1
                        || (curCp.params && ableList.indexOf(curCp.params.dataUrl) !== -1)
                        || isApiNew) {
                        try {
                            let pageCp
                            if (!curCp.isUrl) {
                                pageCp = await import(
                                    '@/pages/' + (dict.commonObj.managePath || 'manage') + '/view/' + curCp.component + '.vue'
                                    )
                            }  else {
                                pageCp = await import('@corecp/NWebView.vue')
                            }
                            pageCp.default.staticKey = curCp.pk
                            const cpAsync = new Promise((resolve) => {
                                resolve(pageCp)
                            })
                            activeCp = (): any => ({
                                component: cpAsync
                            })
                        } catch (e) {
                            NoFound.staticKey = curCp.pk
                            activeCp = NoFound
                            self.$message.error(`${self.$t(dict.localeObj.menuObj.errorTip.notfoundTip)} <<${curCp.component}>>`)
                        }
                    } else {
                        NoRight.staticKey = curCp.pk
                        activeCp = NoRight
                    }
                }
                return activeCp
            }
        },
        watch: {
            curTagIndex () {
                const self = this as any
                // watch curTagIndex, if switch isCache is on, then cache the curTagIndex
                if (comConfig.buildSwitch.isCache) {
                    localStorage.setItem('nearAdminTagIndex', JSON.stringify(self.curTagIndex))
                }
            }
        },
        methods: {
            ...mapActions([
                'changeTag',
                'changeCurTagIndex',
                'changeDefaultIndexs',
                'changeCpLoading'
            ]),
            changeCp (cpInfo: CpInfo, byMenu: boolean = true) {
                const self = this as any
                cpInfo = self.formateCpParams(cpInfo)
                // if empty component, return false
                if (!cpInfo.component) {
                    self.$message.error(`${self.$t(dict.localeObj.menuObj.errorTip.emptyErr)}`)
                    return false
                }
                // check if component is url
                if (!cpInfo.isUrl) {
                    const isCpUrl = utils.isUrl(cpInfo.component)
                    if (isCpUrl) {
                        // modify componet to 'WebView' and add params dataUrl
                        if (cpInfo.params) {
                            cpInfo.params.dataUrl = cpInfo.component
                        } else {
                            cpInfo.params = {
                                dataUrl: cpInfo.component
                            }
                        }
                        cpInfo.component = 'WebView'
                        cpInfo.isUrl = true
                    } else {
                        cpInfo.isUrl = false
                    }
                }
                const {idx: cpExistIdx, pk: cpKey} = self.cpExistIndex(cpInfo)
                // diff way to show tag
                if (cpExistIdx === -1) {
                    // new component page
                    cpInfo.pk = cpKey
                    self.changeTag({
                        op: 'add',
                        cpInfo
                    })
                } else {
                    // old component page
                    self.changeCurTagIndex(cpExistIdx)
                }
                // change default index
                if (!byMenu) {
                    // if not click side menu, then need to update default index
                    self.changeDefaultIndexs([`@bytag@${cpInfo.navIndex}`])
                }
            },
            cpExistIndex (cpInfo: CpInfo) {
                const self = this as any
                let needCacheSame = false
                let cpParams
                try {
                    cpParams = JSON.stringify(cpInfo.params)
                } catch (e) {
                    cpParams = '{}'
                }
                for (let i = 0; i < self.curTagList.length; i++) {
                    const item = self.curTagList[i]
                    // if page component name, navIndex, title, params is same
                    let itemParams
                    try {
                        itemParams = JSON.stringify(item.params)
                    } catch (e) {
                        itemParams = '{}'
                    }
                    if (item.component === cpInfo.component) {
                        if (item.pk === cpInfo.pk) {
                            return {
                                idx: i,
                                pk: item.pk
                            }
                        } else {
                            needCacheSame = true
                        }
                    }
                }
                if (needCacheSame) {
                    return {
                        idx: -1,
                        pk: cpInfo.pk || utils.randomCharacter(6)
                    }
                } else {
                    return {
                        idx: -1,
                        pk: cpInfo.pk || utils.randomCharacter(6)
                    }
                }
            },
            formateCpParams (cpInfo: CpInfo): CpInfo {
                if (cpInfo.params) {
                    cpInfo.params.isAffix = cpInfo.params.isAffix || false
                    cpInfo.params.withoutCache = cpInfo.params.withoutCache || false
                    cpInfo.params.checkSave = cpInfo.params.checkSave || false
                } else {
                    cpInfo.params = {
                        isAffix: false,
                        withoutCache: false,
                        checkSave: false
                    }
                }
                return cpInfo
            },
            singlePage (idx) {
                const self = this
                const curCp = self.curTagList[idx]
                if (curCp.isUrl) {
                    // if is url component, directly open a url
                    window.open(curCp.params.dataUrl)
                } else {
                    const curCpName = curCp.component.split('/').slice(-1)[0]
                    const propsData = {
                        cpParams: curCp.params,
                        pagePath: curCp.component
                    }
                    const routesList = localStorage.getItem(`${dict.commonObj.managePath}AsyncRoute`)
                    let routesListObj: CacheRouteConfig[]
                    try {
                        routesListObj = JSON.parse(routesList)
                        if (!Array.isArray(routesList)) {
                            routesListObj = []
                        }
                    } catch (e) {
                        routesListObj = []
                    }
                    let hadCp = false
                    let cpIndex
                    for (let i = 0; i < routesListObj.length; i++) {
                        const item = routesListObj[i]
                        if (item.name === curCpName) {
                            hadCp = true
                            cpIndex = i
                            break
                        }
                    }
                    if (!hadCp) {
                        routesListObj.push({
                            path: `/${curCpName}`.toLowerCase(),
                            name: curCpName,
                            componentPath: curCp.component,
                            props: propsData
                        })
                    } else {
                        // update params
                        routesListObj[cpIndex].props = propsData
                    }
                    // persisted router
                    localStorage.setItem(`${dict.commonObj.managePath}AsyncRoute`, JSON.stringify(routesListObj))
                    // redirect to new browser tag
                    // check router mode
                    const routerMode = self.$router.mode
                    if (routerMode === 'hash') {
                        // hash mode
                        window.open(`/${dict.commonObj.managePath}/#/${curCpName}`.toLowerCase())
                    } else {
                        // history mode
                        window.open(`/${dict.commonObj.managePath}/${curCpName}`.toLowerCase())
                    }
                }
            },
            affixPage (idx) {
                const self = this
                const targetCp = Object.assign({}, self.curTagList[idx])
                if (targetCp.navIndex === '-1') {
                    self.$message.warn(self.$t(dict.localeObj.tagObj.errorTip.homePageAffixError))
                } else {
                    if (targetCp.params) {
                        targetCp.params.isAffix = !targetCp.params.isAffix
                    } else {
                        targetCp.params = {
                            isAffix: true
                        }
                    }
                    self.changeTag({
                        op: 'update',
                        updateOpt: {
                            idx,
                            updateCpInfo: {
                                params: targetCp.params
                            }
                        }
                    })
                }
            },
            refreshPage (idx) {
                const self = this
                const activeCp = self.$refs['active-cp']
                const newKey = utils.randomCharacter(6)
                activeCp.$vnode.componentOptions.Ctor.staticKey = newKey
                self.changeTag({
                    op: 'update',
                    updateOpt: {
                        idx,
                        updateCpInfo: {
                            pk: newKey
                        }
                    }
                })
            },
            closeCpLoading () {
                const self = this
                self.changeCpLoading(false)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/manage.scss'
</style>
