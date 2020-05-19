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
                    <a-sub-menu :key="`menu-${index}`">
                        <span slot="title" :title="$t(item.name)"><a-icon :type="item.icon" v-if="item.icon"/><span>{{ $t(item.name) }}</span></span>
                        <!-- if have group name -->
                        <a-menu-item-group v-if="item.groupName" :key="`group-${index}`">
                            <template slot="title"><span>{{ $t(item.groupName) }}</span></template>
                            <template v-for="(sitem, sindex) in item.child || []">
                                <template v-if="sitem.child && sitem.child.length > 0">
                                    <a-sub-menu :key="`sub-${index}-${sindex}`" >
                                        <span slot="title" :title="$t(sitem.name)"><a-icon :type="sitem.icon" v-if="sitem.icon"/><span>{{ $t(sitem.name) }}</span></span>
                                        <template v-for="(ssitem, ssindex) in sitem.child || []">
                                            <a-menu-item :key="`sub-${index}-${sindex}-${ssindex}`">
                                                {{ $t(ssitem.name) }}
                                            </a-menu-item>
                                        </template>
                                    </a-sub-menu>
                                </template>
                                <template v-else>
                                    <a-menu-item :key="`sub-${index}-${sindex}`">
                                        {{ $t(sitem.name) }}
                                    </a-menu-item>
                                </template>
                            </template>
                        </a-menu-item-group>
                        <!-- if haven't group name -->
                        <template v-else>
                            <template v-for="(sitem, sindex) in item.child || []">
                                <template v-if="sitem.child && sitem.child.length > 0">
                                    <a-sub-menu :key="`sub-${index}-${sindex}`" >
                                        <span slot="title" :title="$t(sitem.name)"><a-icon :type="sitem.icon" v-if="sitem.icon"/><span>{{ $t(sitem.name) }}</span></span>
                                        <template v-for="(ssitem, ssindex) in sitem.child || []">
                                            <a-menu-item :key="`sub-${index}-${sindex}-${ssindex}`">
                                                {{ $t(ssitem.name) }}
                                            </a-menu-item>
                                        </template>
                                    </a-sub-menu>
                                </template>
                                <template v-else>
                                    <a-menu-item :key="`sub-${index}-${sindex}`">
                                        {{ $t(sitem.name) }}
                                    </a-menu-item>
                                </template>
                            </template>
                        </template>
                    </a-sub-menu>
                </template>
                <template v-else>
                    <a-menu-item :key="`menu-${index}`">
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

    export default Vue.extend({
        name: 'NAside',
        computed: {
          ...mapGetters([
              'menuObj',
              'curMenu',
              'defaultIndexs'
          ])
        },
        methods: {
            ...mapActions([
                'changeDefaultIndexs'
            ]),
            handlerSelect ({key}: {key: string}) {
                const self = this
                self.changeDefaultIndexs([key])
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@scss/core/manage/aside.scss'
</style>
