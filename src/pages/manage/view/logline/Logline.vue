<template>
    <div class="logline-src">
        <!-- search pannel -->
        <n-search-panel @search="getLog" @reset="resetFiled">
            <div class="com-search-ctx" slot="n-search-ctx" slot-scope="{shrinkSwitch}">
                <a-form-model class="n-form" ref="n-form" :colon="false" layout="inline" :model="loglineForm.model">
                    <a-row>
                        <a-col :xs="24" :sm="12" :md="6" :lg="6" v-if="!shrinkSwitch">
                            <a-form-model-item :label="$t(dict.localeObj.logline.time.range)" prop="dateRange">
                                <a-select allow-clear v-model="loglineForm.model.dateRange" size="small" :placeholder="$t(dict.localeObj.logline.time.plh)">
                                    <a-select-option :key="index" v-for="(item, index) in loglineForm.external.dateRangeList" :value="item.value">
                                        {{ $t(item.name) }}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
        </n-search-panel>
        <!-- result table -->
        <div class="n-logline-table">
            <n-common-table :table-obj="loglineTable" @btnevent="btnEvent">
                <a-table slot-scope="{sizeClass, selectColumns, rowClass}"
                         :class="sizeClass" row-key="idx" slot="n-com-table"
                         :columns="selectColumns"
                         :data-source="loglineTable.data"
                         :scroll="{ x: '100%' }"
                         :pagination="loglineTable.pagingInfo"
                         :row-class-name="rowClass"
                         @change="pageChange"
                >
                    <a-tooltip placement="topLeft" slot="title-1">
                        <template slot="title">
                            {{ $t(dict.localeObj.logline.tableColumns.index) }}
                        </template>
                        <span>{{ $t(dict.localeObj.logline.tableColumns.index) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-2">
                        <template slot="title">
                            {{ $t(dict.localeObj.logline.tableColumns.desc) }}
                        </template>
                        <span>{{ $t(dict.localeObj.logline.tableColumns.desc) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-3">
                        <template slot="title">
                            {{ $t(dict.localeObj.logline.tableColumns.type) }}
                        </template>
                        <span>{{ $t(dict.localeObj.logline.tableColumns.type) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-4">
                        <template slot="title">
                            {{ $t(dict.localeObj.logline.tableColumns.time) }}
                        </template>
                        <span>{{ $t(dict.localeObj.logline.tableColumns.time) }}</span>
                    </a-tooltip>
                    <a-tooltip placement="topLeft" slot="title-5">
                        <template slot="title">
                            {{ $t(dict.localeObj.logline.tableColumns.op) }}
                        </template>
                        <span>{{ $t(dict.localeObj.logline.tableColumns.op) }}</span>
                    </a-tooltip>
                    <span slot="time" slot-scope="time">
                        {{ timestampToDateString(time, '-', false, false, false) }}
                    </span>
                    <span slot="operate" slot-scope="record">
                        <a-button class="n-ant-btn-link" type="link" @click="showLogDetail(record)">{{ $t(dict.localeObj.normalBtn.detail) }}</a-button>
                    </span>
                </a-table>
            </n-common-table>
        </div>
        <!-- logline detail -->
        <a-modal
                :title="$t(loglineDetail.props.title)"
                v-model="loglineDetail.props.visible"
                :width="loglineDetail.props.width"
                :footer="null"
        >
            <n-common-title :title="dict.localeObj.logline.detail"></n-common-title>
            <div class="n-logline-basic-info">
                <a-form-model class="n-form" :colon="false" layout="inline" :model="loglineDetail.model">
                    <a-row>
                        <a-col :xs="24" :sm="24" :md="12" :lg="12">
                            <a-form-model-item :label="$t(dict.localeObj.logline.tableColumns.type)">
                                <a-input size="small" disabled v-model="loglineDetail.model.level"></a-input>
                            </a-form-model-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="12" :lg="12">
                            <a-form-model-item :label="$t(dict.localeObj.logline.tableColumns.time)">
                                <a-input size="small" disabled :value="timestampToDateString(loglineDetail.model.time, '-', false, false, false)"></a-input>
                            </a-form-model-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24">
                            <a-form-model-item :label="$t(dict.localeObj.logline.tableColumns.desc)">
                                <a-textarea :auto-size="loglineDetail.props.autoSize" size="small" disabled v-model="loglineDetail.model.descriptor"></a-textarea>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
            <n-common-title :title="dict.localeObj.logline.request"></n-common-title>
            <div class="n-logline-detail-info">
                <n-codemirror :code-data="formateLogData(loglineDetail.model.data)"></n-codemirror>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import NSearchPanel from '@corecp/NSearchPanel.vue'
    import NCommonTable from '@corecp/NCommonTable.vue'
    import NCodemirror from '@corecp/NCodemirror.vue'
    import NCommonTitle from '@corecp/NCommonTitle.vue'
    import dict from '@custom/dict'
    import utils from '@corets/utils'
    import {ComTable} from '@corets/type'

    export default Vue.extend({
        name: 'Logline',
        mixins: [CoreBase, Base],
        components: {
            NSearchPanel,
            NCommonTable,
            NCodemirror,
            NCommonTitle
        },
        data () {
            return {
                loglineTable: {
                    title: dict.localeObj.logline.list,
                    columns: [
                        {
                            name: dict.localeObj.logline.tableColumns.index,
                            dataIndex: 'number',
                            key: 'number',
                            ellipsis: true,
                            width: 60,
                            slots: {
                                title: 'title-1'
                            },
                            customRender: (text: any, record: any, index: any) => {
                                const self = this as any
                                return (self.loglineTable.pagingInfo.currentPage - 1)
                                    * self.loglineTable.pagingInfo.pageSize + index + 1
                            }
                        },
                        {
                            name: dict.localeObj.logline.tableColumns.desc,
                            dataIndex: 'descriptor',
                            key: 'descriptor',
                            ellipsis: true,
                            slots: {
                                title: 'title-2'
                            }
                        },
                        {
                            name: dict.localeObj.logline.tableColumns.type,
                            dataIndex: 'level',
                            key: 'level',
                            width: 100,
                            ellipsis: true,
                            slots: {
                                title: 'title-3'
                            }
                        },
                        {
                            name: dict.localeObj.logline.tableColumns.time,
                            dataIndex: 'time',
                            key: 'time',
                            width: 160,
                            ellipsis: true,
                            slots: {
                                title: 'title-4'
                            },
                            scopedSlots: { customRender: 'time' }
                        },
                        {
                            name: dict.localeObj.logline.tableColumns.op,
                            key: 'operate',
                            width: 160,
                            slots: {
                                title: 'title-5'
                            },
                            scopedSlots: { customRender: 'operate' }
                        }
                    ],
                    pagingInfo: {
                        ...dict.commonObj.tablePagingInfoOpt
                    },
                    data: [],
                    btnList: [
                        {
                            name: dict.localeObj.logline.btnList.export,
                            method: 'exportLog'
                        },
                        {
                            name: dict.localeObj.logline.btnList.remove,
                            method: 'removeLog'
                        }
                    ]
                } as ComTable,
                loglineDetail: {
                    model: {
                        data: null,
                        descriptor: null,
                        level: null,
                        time: null
                    },
                    props: {
                        title: dict.localeObj.logline.detail,
                        visible: false,
                        width: 800,
                        autoSize: {
                            minRows: 3,
                            maxRows: 3
                        }
                    }
                },
                loglineForm: {
                    model: {
                        dateRange: undefined
                    },
                    external: {
                        dateRangeList: [
                            {
                                name: dict.localeObj.logline.time.halfDay,
                                value: '.5d'
                            },
                            {
                                name: dict.localeObj.logline.time.oneDay,
                                value: '1d'
                            },
                            {
                                name: dict.localeObj.logline.time.weekDay,
                                value: '7d'
                            },
                            {
                                name: dict.localeObj.logline.time.monthDay,
                                value: '30d'
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            exportLog () {
                const self = this
                utils.loglineObj.getLog({
                    start: self.loglineForm.model.dateRange,
                    callback: (data: any) => {
                        data = data.reverse()
                        const dataList: object[] = []
                        const columnList = [
                            self.$t(dict.localeObj.logline.tableColumns.index),
                            self.$t(dict.localeObj.logline.tableColumns.desc),
                            self.$t(dict.localeObj.logline.tableColumns.type),
                            self.$t(dict.localeObj.logline.tableColumns.time),
                            self.$t(dict.localeObj.logline.detail)
                        ] as string[]
                        data.forEach((item: any, index: number) => {
                            dataList.push({
                                idx: index + 1,
                                descriptor: item.descriptor,
                                level: item.level,
                                time: utils.timestampToDateString(item.time, '-', false, false, false),
                                data: JSON.stringify(item.data)
                            })
                        })
                        utils.exportExcel(columnList, dataList, self.$t(dict.localeObj.logline.detail) as string)
                    }
                })
            },
            getLog (pageNum = 1) {
                const self = this
                self.loglineTable.pagingInfo.currentPage = pageNum
                utils.loglineObj.getLog({
                    start: self.loglineForm.model.dateRange,
                    callback: (data: any) => {
                        data = data.reverse()
                        self.loglineTable.pagingInfo.totalRows = data.length
                        const temData = data.splice(
                            (self.loglineTable.pagingInfo.currentPage - 1) * self.loglineTable.pagingInfo.pageSize,
                            self.loglineTable.pagingInfo.pageSize
                        )
                        temData.forEach((item: any, index: number) => {
                            item.idx = index + 1
                        })
                        self.loglineTable.data = temData
                    }
                })
            },
            pageChange (obj: any) {
                const self = this
                self.loglineTable.pagingInfo.pageSize = obj.pageSize
                self.getLog(obj.currentPage)
            },
            timestampToDateString: utils.timestampToDateString,
            showLogDetail (record: any) {
                const self = this as any
                self.loglineDetail.model = record
                self.loglineDetail.props.visible = true
            },
            formateLogData (data: any) {
                return JSON.stringify(data, null, 4)
            },
            resetFiled () {
                const self = this as any
                self.$refs['n-form'].resetFields()
                self.getLog()
            },
            btnEvent (method: string) {
                const self = this as any
                if (self[method]) {
                    self[method]()
                }
            },
            removeLog () {
                const self = this
                self.$confirm({
                    content: self.$t(dict.localeObj.logline.error.confirm),
                    onOk () {
                        utils.loglineObj.cleanLog()
                        self.$message.success(self.$t(dict.localeObj.logline.success) as string)
                        self.getLog()
                    },
                    onCancel () {
                        self.$message.info(self.$t(dict.localeObj.logline.error.cancel) as string)
                    }
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/logline.scss'
</style>
