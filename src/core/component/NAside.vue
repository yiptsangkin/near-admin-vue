<template>
    <a-layout-sider class="n-layout-sider" v-model="shrinkLeftMenu" :collapsedWidth="0">
        <div class="n-aside-wrp">
            <a-menu
                    class="n-layout-sider-menu"
                    mode="inline"
                    :selectedKeys="defaultIndexs"
                    @select="handlerSelect"
            >
                <!-- if child is empty -->
                <template v-for="(item, index) in (menuObj.menuList[curMenu] ? (menuObj.menuList[curMenu].child || []) : [])">
                    <template v-if="item.child && item.child.length > 0">
                        <a-sub-menu :key="`menu-${index}`" :nav-index="`menu-${index}`">
                            <span slot="title" :title="$t(item.name)">
                                <template v-if="(typeof item.icon) === 'string'">
                                    <a-icon :type="item.icon" v-if="item.icon"/>
                                </template>
                                <template v-else>
                                    <template v-if="item.icon.type === 'aicon'">
                                        <a-icon :type="item.icon.value" v-if="item.icon.value"/>
                                    </template>
                                    <template v-else>
                                        <span :class="`anticon iconfont ${item.icon.value}`" v-if="item.icon.value"></span>
                                    </template>
                                </template>
                                <span>{{ $t(item.name) }}</span>
                            </span>
                            <!-- if have group name -->
                            <a-menu-item-group v-if="item.groupName" :key="`group-${index}`" :nav-index="`group-${index}`">
                                <template slot="title"><span>{{ $t(item.groupName) }}</span></template>
                                <template v-for="(sitem, sindex) in item.child || []">
                                    <template v-if="sitem.child && sitem.child.length > 0">
                                        <a-sub-menu :key="`sub-${index}-${sindex}`" :nav-index="`sub-${index}-${sindex}`">
                                            <span slot="title" :title="$t(sitem.name)">
                                                <template v-if="(typeof sitem.icon) === 'string'">
                                                    <a-icon :type="sitem.icon" v-if="sitem.icon"/>
                                                </template>
                                                <template v-else>
                                                    <template v-if="sitem.icon.type === 'aicon'">
                                                        <a-icon :type="sitem.icon.value" v-if="sitem.icon.value"/>
                                                    </template>
                                                    <template v-else>
                                                        <span :class="`anticon iconfont ${sitem.icon.value}`" v-if="sitem.icon.value"></span>
                                                    </template>
                                                </template>
                                                <span>{{ $t(sitem.name) }}</span>
                                            </span>
                                            <template v-for="(ssitem, ssindex) in sitem.child || []">
                                                <a-menu-item
                                                        :key="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :nav-index="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :cp-path="ssitem.path"
                                                        :params-detail="encodeParams(ssitem.params)"
                                                        :cp-name="ssitem.name"
                                                >
                                                    {{ $t(ssitem.name) }}
                                                </a-menu-item>
                                            </template>
                                        </a-sub-menu>
                                    </template>
                                    <template v-else>
                                        <a-menu-item
                                                :key="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :nav-index="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :cp-path="sitem.path"
                                                :params-detail="encodeParams(sitem.params)"
                                                :cp-name="sitem.name"
                                        >
                                            {{ $t(sitem.name) }}
                                        </a-menu-item>
                                    </template>
                                </template>
                            </a-menu-item-group>
                            <!-- if haven't group name -->
                            <template v-else>
                                <template v-for="(sitem, sindex) in item.child || []">
                                    <template v-if="sitem.child && sitem.child.length > 0">
                                        <a-sub-menu :key="`sub-${index}-${sindex}`" :nav-index="`sub-${index}-${sindex}`">
                                            <span slot="title" :title="$t(sitem.name)">
                                                <template v-if="(typeof sitem.icon) === 'string'">
                                                    <a-icon :type="sitem.icon" v-if="sitem.icon"/>
                                                </template>
                                                <template v-else>
                                                    <template v-if="sitem.icon.type === 'aicon'">
                                                        <a-icon :type="sitem.icon.value" v-if="sitem.icon.value"/>
                                                    </template>
                                                    <template v-else>
                                                        <span :class="`anticon iconfont ${sitem.icon.value}`" v-if="sitem.icon.value"></span>
                                                    </template>
                                                </template>
                                                <span>{{ $t(sitem.name) }}</span>
                                            </span>
                                            <template v-for="(ssitem, ssindex) in sitem.child || []">
                                                <a-menu-item
                                                        :key="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :nav-index="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :cp-path="ssitem.path"
                                                        :params-detail="encodeParams(ssitem.params)"
                                                        :cp-name="ssitem.name"
                                                >
                                                    {{ $t(ssitem.name) }}
                                                </a-menu-item>
                                            </template>
                                        </a-sub-menu>
                                    </template>
                                    <template v-else>
                                        <a-menu-item
                                                :key="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :nav-index="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :cp-path="sitem.path"
                                                :params-detail="encodeParams(sitem.params)"
                                                :cp-name="sitem.name"
                                        >
                                            {{ $t(sitem.name) }}
                                        </a-menu-item>
                                    </template>
                                </template>
                            </template>
                        </a-sub-menu>
                    </template>
                    <template v-else>
                        <a-menu-item
                                :key="`menu-${curMenu}-${index}`"
                                :nav-index="`menu-${curMenu}-${index}`"
                                :cp-path="item.path"
                                :cp-name="item.name"
                                :params-detail="encodeParams(item.params)"
                        >
                            {{ $t(item.name) }}
                        </a-menu-item>
                    </template>
                </template>
            </a-menu>
        </div>
        <div class="n-aside-shrink-btn" @click="changeShrink">
            <a-icon class="shrink-arrow" :type="shrinkLeftMenu ? 'right' : 'left'" />
        </div>
    </a-layout-sider>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import utils from '@corets/utils'
    import {CpInfo} from '@corets/type'

    export default Vue.extend({
        name: 'NAside',
        computed: {
          ...mapGetters([
              'menuObj',
              'curMenu',
              'defaultIndexs',
              'shrinkLeftMenu'
          ])
        },
        watch: {
            defaultIndexs (n) {
                const self = this as any
                if (!n || !n[0] || typeof n[0] !== 'string') {
                    // check if have value
                    return false
                }
                // check if click by tag, if true, no need to emit change-cp
                const notFromMenuReg = /@bytag@/g
                const isNotFromMenu = notFromMenuReg.test(n)
                const cpIndex = n[0].replace('@bytag@', '')
                const existMenu = self.$el.querySelector(`li[nav-index="${cpIndex}"]`)

                // check if side menu exist index
                if (existMenu) {
                    // exist
                    const cpPath = existMenu.getAttribute('cp-path')
                    const cpTitle = existMenu.getAttribute('cp-name')
                    const menuParams = utils.decodeParams(existMenu.getAttribute('params-detail') || '')
                    if (!isNotFromMenu) {
                        self.$emit('change-cp', {
                            component: cpPath,
                            title: cpTitle,
                            navIndex: cpIndex,
                            params: menuParams || null,
                            pk: cpIndex,
                            breadList: self.getBreadList(cpIndex)
                        } as CpInfo)
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'changeDefaultIndexs',
                'changeShrinkLeftMenu'
            ]),
            handlerSelect ({key}: {key: string}) {
                const self = this as any
                self.changeDefaultIndexs([key])
            },
            encodeParams: utils.encodeParams,
            changeShrink () {
                const self = this as any
                self.changeShrinkLeftMenu(!self.shrinkLeftMenu)
            },
            getBreadList (navIndex: string) {
                const self = this as any
                const navIndexList = navIndex.split('-sub-')
                const topMenuIndex = navIndexList[0].split('-')[1]
                const asideMenuIndexList = navIndexList[1].split('-')
                const breadList = []

                const topMenuObj = self.menuObj.menuList[topMenuIndex]
                let temMenuList = topMenuObj.child
                breadList.push(topMenuObj)
                asideMenuIndexList.forEach((item, index) => {
                    const temMenuObj = temMenuList[item]
                    temMenuList = temMenuObj.child
                    breadList.push(temMenuObj)
                })
                return breadList
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/aside.scss'
</style>
