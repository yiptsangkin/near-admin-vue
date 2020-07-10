<template>
    <div class="logline-src">
        <n-search-panel @search="getLog">
            <div class="com-search-ctx" slot="n-search-ctx">
                <a-form-model :colon="false" layout="inline" :model="loglineForm.model">
                    <a-form-model-item :label="$t(dict.logline.time.range)">
                        <a-select allow-clear v-model="loglineForm.model.dateRange" size="small" style="width: 160px" :placeholder="$t(dict.logline.time.plh)">
                            <a-select-option :key="index" v-for="(item, index) in loglineForm.external.dateRangeList" :value="$t(item.value)">
                                {{ $t(item.name) }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item :label="$t(dict.logline.type.logType)">
                        <a-select allow-clear v-model="loglineForm.model.logType" size="small" style="width: 160px" :placeholder="$t(dict.logline.type.plh)">
                            <a-select-option :key="index" v-for="(item, index) in loglineForm.external.logTypeList" :value="$t(item.value)">
                                {{ $t(item.name) }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </n-search-panel>
        <div class="n-logline-table">
            <n-common-table :table-obj="loglineTable">
                <a-table slot="com-table" :columns="loglineTable.columns" :data-source="loglineTable.data">
                    <a-tooltip placement="topLeft" slot="title-1">
                        <template slot="title">
                            {{ $t(dict.logline.tableColumns.index) }}
                        </template>
                        <span>{{ $t(dict.logline.tableColumns.index) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-2">
                        <template slot="title">
                            {{ $t(dict.logline.tableColumns.desc) }}
                        </template>
                        <span>{{ $t(dict.logline.tableColumns.desc) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-3">
                        <template slot="title">
                            {{ $t(dict.logline.tableColumns.type) }}
                        </template>
                        <span>{{ $t(dict.logline.tableColumns.type) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-4">
                        <template slot="title">
                            {{ $t(dict.logline.tableColumns.op) }}
                        </template>
                        <span>{{ $t(dict.logline.tableColumns.op) }}</span>
                    </a-tooltip>
                    <a slot="tidx" slot-scope="text">{{ text }}</a>
                </a-table>
            </n-common-table>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import NSearchPanel from '@corecp/NSearchPanel.vue'
    import NCommonTable from '@corecp/NCommonTable.vue'
    import dict from '@custom/dict'
    import utils from '@corets/utils'
    import {ComTable} from '@corets/type'

    export default Vue.extend({
        name: 'Logline',
        mixins: [CoreBase, Base],
        components: {
            NSearchPanel,
            NCommonTable
        },
        data () {
            return {
                loglineTable: {
                    title: dict.logline.list,
                    columns: [
                        {
                            dataIndex: 'descriptor',
                            key: 'descriptor',
                            ellipsis: true,
                            slots: {
                                title: 'title-2'
                            }
                        },
                        {
                            dataIndex: 'level',
                            key: 'level',
                            ellipsis: true,
                            slots: {
                                title: 'title-3'
                            }
                        },
                        {
                            dataIndex: 'time',
                            key: 'time',
                            ellipsis: true,
                            slots: {
                                title: 'title-4'
                            }
                        }
                    ],
                    pagingInfo: {
                        currentPage: 1,
                        pageSize: 10,
                        totalRows: 0
                    },
                    data: [],
                    btnList: [
                        {
                            name: dict.logline.btnList.export,
                            method: 'exportLog'
                        },
                        {
                            name: dict.logline.btnList.remove,
                            method: 'removeLog'
                        }
                    ]
                } as ComTable,
                loglineForm: {
                    model: {
                        dateRange: undefined,
                        logType: undefined
                    },
                    external: {
                        dateRangeList: [
                            {
                                name: dict.logline.time.halfDay,
                                value: dict.logline.time.halfDay
                            },
                            {
                                name: dict.logline.time.oneDay,
                                value: dict.logline.time.oneDay
                            },
                            {
                                name: dict.logline.time.weekDay,
                                value: dict.logline.time.weekDay
                            },
                            {
                                name: dict.logline.time.monthDay,
                                value: dict.logline.time.monthDay
                            }
                        ],
                        logTypeList: [
                            {
                                name: 'error',
                                value: 'error'
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            exportLog () {
                console.log('to export log file')
            },
            getLog () {
                const self = this
                utils.loglineObj.getLog({
                    callback: (data: any) => {
                        data = data.reverse()
                        self.loglineTable.pagingInfo.totalRows = data.length
                        self.loglineTable.data = data.splice(
                            (self.loglineTable.pagingInfo.currentPage - 1) * self.loglineTable.pagingInfo.pageSize,
                            self.loglineTable.pagingInfo.pageSize
                        )
                    }
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/logline.scss'
</style>
