<template>
    <div class="n-manage-ctx">
        <a-layout class="n-layout-wrp">
            <n-header></n-header>
            <a-layout>
                <n-aside @change-cp="changeCp"></n-aside>
                <a-layout-content class="n-layout-content">
                    <n-tag @change-cp="changeCp"></n-tag>
                    <div class="n-component-page">
                        <keep-alive :include="curTagList.map(function(e){let o = e.component.split('/'); return o[o.length-1]}).toString()">
                            <component ref="active-cp" :is="isExist ? activeComponent : noFound"></component>
                        </keep-alive>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">

    // @ts-nocheck

    import Vue from 'vue'
    import CoreBase from '@core/base'
    import NAside from '../../component/core/NAside.vue'
    import NHeader from '../../component/core/NHeader.vue'
    import NTag from '../../component/core/NTag.vue'
    import NoRight from '../../component/core/NNoRight.vue'
    import NoFound from '../../component/core/NNoFound.vue'
    import {CpInfo} from '@core/type'
    import utils from '@core/utils'
    import {mapActions, mapGetters} from 'vuex'
    import comConfig from '@custom/config';
    import dict from '@custom/dict';

    export default Vue.extend({
        name: 'Manage',
        mixins: [CoreBase],
        components: {
            NAside,
            NHeader,
            NTag
        },
        data () {
            return {
                isExist: true
            }
        },
        computed: {
            ...mapGetters([
                'curTagList',
                'curTagIndex',
                'rightPathList'
            ]),
            noFound () {
                return NoFound
            }
        },
        asyncComputed: {
            activeComponent () {
                const self = this
                let activeCp
                const curCp = self.curTagList[self.curTagIndex]
                console.log(curCp)
                // check right path
                const ableList = self.rightPathList.concat(comConfig.sysInfo.noNeedCheckRightPath)
                if (curCp.component) {
                    // is created by directive
                    const isApiNew = curCp.params ? curCp.params.apiNew : false
                    if (ableList.indexOf(curCp.component) !== -1 || isApiNew) {
                        activeCp = (): any => ({
                            component: import('../' + curCp.component).then((res: any) => {
                                return res.default
                            }).catch((e: any) => {
                                self.isExist = false
                                self.$message.error(`${self.$t(dict.localeObj.menuObj.errorTip.notfoundTip)} <<${curCp.component}>>`)
                            }),
                            delay: 200,
                            timeout: 10000
                        })
                    } else {
                        activeCp = NoRight
                    }
                } else {
                    self.isExist = false
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
                // default exist
                self.isExist = true
                // if empty component, return false
                if (!cpInfo.component) {
                    self.$message.error(`${self.$t(dict.localeObj.menuObj.errorTip.emptyErr)}`)
                    return false
                }
                // check if component is url
                const isCpUrl = utils.isUrl(cpInfo.component)
                const cpExistIdx = self.cpExistIndex(cpInfo.component)
                // diff way to show tag
                if (cpExistIdx === -1) {
                    // new component page
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
            cpExistIndex (cpName: string) {
                const self = this
                for (let i = 0; i < self.curTagList.length; i++) {
                    const item = self.curTagList[i]
                    if (item.component === cpName) {
                        return i
                    }
                }
                return -1
            },
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@scss/core/manage/manage.scss'
</style>
