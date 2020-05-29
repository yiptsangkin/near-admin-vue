<template>
    <div class="n-manage-ctx">
        <a-layout class="n-layout-wrp">
            <n-header></n-header>
            <a-layout>
                <n-aside @change-cp="changeCp"></n-aside>
                <a-layout-content class="n-layout-content">
                    <n-tag @change-cp="changeCp"></n-tag>
                    <div class="n-component-page">
                        <n-keep-alive ref="keep-alive-cp"
                                      :include="curTagList.map((e) => {return `${e.pk}`}).toString()"
                        >
                            <component
                                    ref="active-cp"
                                    :is="activeComponent"
                                    :key="curTagList[curTagIndex].pk"
                                    :cp-params="curTagList[curTagIndex].params"
                                    :page-path="curTagList[curTagIndex].component"
                            ></component>
                        </n-keep-alive>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">

    // @ts-nocheck

    import Vue from 'vue'
    import ManageBase from '@corets/mbase'
    import NAside from '@corecp/NAside.vue'
    import NHeader from '@corecp/NHeader.vue'
    import NTag from '@corecp/NTag.vue'
    import NoRight from '@corecp/NNoRight.vue'
    import NoFound from '@corecp/NNoFound.vue'
    import NKeepAlive from '@corecp/NKeepAlive'
    import {CpInfo} from '@corets/type'
    import utils from '@corets/utils'
    import {mapActions, mapGetters} from 'vuex'
    import comConfig from '@custom/config'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'Manage',
        mixins: [ManageBase],
        components: {
            NAside,
            NHeader,
            NTag,
            NKeepAlive
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters([
                'curTagList',
                'curTagIndex',
                'rightPathList'
            ])
        },
        asyncComputed: {
            async activeComponent () {
                const self = this
                let activeCp
                const curCp = self.curTagList[self.curTagIndex]
                // check right path
                const ableList = self.rightPathList.concat(comConfig.sysInfo.noNeedCheckRightPath)
                if (curCp.component) {
                    // is created by directive
                    const isApiNew = curCp.params ? curCp.params.apiNew : false
                    if (ableList.indexOf(curCp.component) !== -1 || isApiNew) {
                        try {
                            const pageCp = await import(
                                '@/pages/' + (dict.commonObj.managePath || 'manage') + '/view/' + curCp.component + '.vue'
                            )
                            const cpAsync = new Promise((resolve) => {
                                resolve(pageCp)
                            })
                            activeCp = (): any => ({
                                component: cpAsync
                            })
                        } catch (e) {
                            activeCp = NoFound
                            self.$message.error(`${self.$t(dict.localeObj.menuObj.errorTip.notfoundTip)} <<${curCp.component}>>`)
                        }
                    } else {
                        activeCp = NoRight
                    }
                }
                return activeCp
            }
        },
        methods: {
            ...mapActions([
                'changeTag',
                'changeCurTagIndex',
                'changeDefaultIndexs'
            ]),
            changeCp (cpInfo: CpInfo, byMenu: boolean = true) {
                const self = this
                // if empty component, return false
                if (!cpInfo.component) {
                    self.$message.error(`${self.$t(dict.localeObj.menuObj.errorTip.emptyErr)}`)
                    return false
                }
                // check if component is url
                const isCpUrl = utils.isUrl(cpInfo.component)
                const {idx: cpExistIdx, pk: cpKey} = self.cpExistIndex(cpInfo)
                // diff way to show tag
                if (cpExistIdx === -1) {
                    // new component page
                    cpInfo.pk = cpKey
                    self.changeTag({
                        op: 'add',
                        cpInfo
                    })
                    // pick last tag
                    const lastIdx = self.curTagList.length - 1
                    self.changeCurTagIndex(lastIdx)
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
                const self = this
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
                        if (item.navIndex === cpInfo.navIndex && item.title === cpInfo.title && itemParams === cpParams) {
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
                        pk: utils.randomCharacter(6)
                    }
                } else {
                    return {
                        idx: -1,
                        pk: utils.randomCharacter(6)
                    }
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/manage.scss'
</style>
