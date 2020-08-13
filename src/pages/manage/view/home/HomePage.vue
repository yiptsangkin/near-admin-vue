<template>
    <div class="customer-entry">
        <a-row>
            <a-col :span="10">
                <template v-if="cacheEntry.length > 0">
                    <n-common-title :title="dict.localeObj.setting.customEntry" no-top></n-common-title>
                    <div class="customer-entry-item-wrp">
                        <span @click="toPage(item)" class="customer-entry-item" v-for="(item, index) in cacheEntry" :key="index" :span="6">
                            <a-tooltip placement="top" slot="title-1">
                                <template slot="title">
                                    {{ $t(item.title) }}
                                </template>
                                {{ $t(item.title) }}
                            </a-tooltip>
                        </span>
                    </div>
                </template>
            </a-col>
            <a-col></a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import {mapGetters} from 'vuex'
    import NCommonTitle from '@corecp/NCommonTitle.vue'
    import dict from '@custom/dict';

    export default Vue.extend({
        name: 'HomePage',
        mixins: [CoreBase, Base],
        components: {
            NCommonTitle
        },
        computed: {
            ...mapGetters([
                'cacheEntry'
            ])
        },
        methods: {
            toPage (page: any) {
                const self = this as any
                self.$newpage({
                    title: page.title,
                    component: page.path
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@scss/custom/manage/homepage.scss'
</style>
