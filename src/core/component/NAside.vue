<template>
    <a-layout-sider class="n-layout-sider">
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
                        <span slot="title" :title="$t(item.name)"><a-icon :type="item.icon" v-if="item.icon"/><span>{{ $t(item.name) }}</span></span>
                        <!-- if have group name -->
                        <a-menu-item-group v-if="item.groupName" :key="`group-${index}`" :nav-index="`group-${index}`">
                            <template slot="title"><span>{{ $t(item.groupName) }}</span></template>
                            <template v-for="(sitem, sindex) in item.child || []">
                                <template v-if="sitem.child && sitem.child.length > 0">
                                    <a-sub-menu :key="`sub-${index}-${sindex}`" :nav-index="`sub-${index}-${sindex}`">
                                        <span slot="title" :title="$t(sitem.name)"><a-icon :type="sitem.icon" v-if="sitem.icon"/><span>{{ $t(sitem.name) }}</span></span>
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
                                        <span slot="title" :title="$t(sitem.name)"><a-icon :type="sitem.icon" v-if="sitem.icon"/><span>{{ $t(sitem.name) }}</span></span>
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
              'defaultIndexs'
          ])
        },
        watch: {
            defaultIndexs (n, o) {
                const self = this
                if (!n || !n[0] || typeof n[0] !== 'string') {
                    // check if have value
                    return false
                }
                // check if click by tag, if true, no need to emit change-cp
                const notFromMenuReg = /@bytag@/g
                const isNotFromMenu = notFromMenuReg.test(n)
                n[0] = n[0].replace('@bytag@', '')
                const paramsSplitList = n[0].split('@longgap@')
                const path = paramsSplitList[0]
                const pathSplitList = path.split('@gap@')
                const cpIndex = pathSplitList[0]
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
                            params: menuParams || null
                        } as CpInfo)
                    }
                } else if (cpIndex !== '-1') {
                    // not homepage
                    const apiParams = utils.decodeParams(paramsSplitList[1] || '')
                    console.log('api create')
                } else {
                    // homepage
                    console.log('to homepage')
                }

            }
        },
        methods: {
            ...mapActions([
                'changeDefaultIndexs'
            ]),
            handlerSelect ({key}: {key: string}) {
                const self = this
                self.changeDefaultIndexs([key])
            },
            encodeParams: utils.encodeParams
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/aside.scss'
</style>
