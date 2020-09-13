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
        </a-row>
        <a-row>
            <n-multi-select
                    v-model="abe"
                    :paging-info="pagingInfo"
                    :option-formatter="formatterOption"
                    :options-list="optionsList"
                    :option-columns="optionColumns"
                    @change-page="changePage"
            ></n-multi-select>
        </a-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import {mapGetters} from 'vuex'
    import NCommonTitle from '@corecp/NCommonTitle.vue'
    import NMultiSelect from '@corecp/NMultiSelect.vue'
    import {PagingInfo} from '@corets/type';

    export default Vue.extend({
        name: 'HomePage',
        mixins: [CoreBase, Base],
        components: {
            NCommonTitle,
            NMultiSelect
        },
        computed: {
            ...mapGetters([
                'cacheEntry',
                'userInfo'
            ])
        },
        methods: {
            toPage (page: any) {
                const self = this as any
                self.$newpage({
                    title: page.title,
                    component: page.path
                })
            },
            formatterOption () {
                const self = this as any
                const newList = []
                for (let i = 0; i < 10; i++) {
                    const temItem = {
                        ...self.optionsList[0],
                        value: `${self.optionsList[0].value}-${i}`
                    }
                    newList.push(temItem)
                }
                return newList
            },
            changePage (current: number) {
                const self = this
                self.pagingInfo.currentPage = current
            }
        },
        data () {
            return {
                optionsList: [
                    {
                        value: 'nihao1',
                        label: 'nihao2'
                    }
                ],
                test: '',
                optionColumns: [
                    {
                        title: '你好',
                        field: 'value',
                        width: 240
                    },
                    {
                        title: '你好',
                        field: 'label',
                        width: 240
                    }
                ],
                abe: '123123',
                pagingInfo: {
                    currentPage: 1,
                    pageSize: 2,
                    totalRows: 5
                } as PagingInfo
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@scss/custom/manage/homepage.scss'
</style>
