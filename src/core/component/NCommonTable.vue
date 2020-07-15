<template>
    <div :class="['n-common-table-wrp', isShrink ? 'n-full-common-table' : '']">
        <div class="n-common-table-title">
            <a-row>
                <a-col :span="8">{{ $t(tableObj.title) }}</a-col>
                <a-col class="n-common-table-btn-ctl" :span="16">
                    <a-button class="n-common-table-btn" :type="item.type || 'primary'" size="small" v-for="(item, index) in tableObj.btnList" @click="triggerBtn(item)" :key="index">{{ $t(item.name) }}</a-button>
                    <a-divider type="vertical" />
                    <a-dropdown overlay-class-name="n-border-none" v-model="dropdownVisible">
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>{{ $t(dict.localeObj.comTable.columns.title) }}</span>
                            </template>
                            <a-icon type="setting"/>
                        </a-tooltip>
                        <a-menu slot="overlay">
                            <a-menu multiple :selectedKeys="[]">
                                <a-menu-item>
                                    <a-row type="flex" justify="space-between">
                                        <a-col>
                                            <a-checkbox @change="changeAllCheck" :indeterminate="indeterminate" v-model="checkAll" size="small">{{ $t(dict.localeObj.comTable.columns.all) }}</a-checkbox>
                                        </a-col>
                                        <a-col>
                                            <a-button class="n-ant-btn-link" type="link" @click="init(true)">{{ $t(dict.localeObj.comTable.columns.reset) }}</a-button>
                                        </a-col>
                                    </a-row>
                                </a-menu-item>
                            </a-menu>
                            <a-divider class="n-h-divider"/>
                            <a-menu multiple :selectedKeys="[]">
                                <a-menu-item v-for="(item, index) in selectedColumns" :key="index">
                                    <a-row type="flex" justify="space-between">
                                        <a-col>
                                            <a-checkbox @change="changeColumns" v-model="item.isChecked" size="small">{{ $t(item.name) }}</a-checkbox>
                                        </a-col>
                                        <a-col class="n-pin-wrp">
                                            <a-tooltip placement="top">
                                                <template slot="title">
                                                    <span>{{ $t(dict.localeObj.comTable.columns.fixedLeft) }}</span>
                                                </template>
                                                <a-icon @click="fixedAction(index, 'left')" v-if="item.fixed !== 'left'" class="c-pin l-pin" type="pushpin" />
                                            </a-tooltip>
                                            <a-tooltip placement="top">
                                                <template slot="title">
                                                    <span>{{ $t(dict.localeObj.comTable.columns.fixedRight) }}</span>
                                                </template>
                                                <a-icon @click="fixedAction(index, 'right')" v-if="item.fixed !== 'right'" class="c-pin" type="pushpin" />
                                            </a-tooltip>
                                            <a-tooltip placement="top">
                                                <template slot="title">
                                                    <span>{{ $t(dict.localeObj.comTable.columns.cancelFixed) }}</span>
                                                </template>
                                                <a-icon @click="fixedAction(index, 'cancel')" v-if="item.fixed === 'right' || item.fixed === 'left'" class="c-pin" type="vertical-align-middle" />
                                            </a-tooltip>
                                        </a-col>
                                    </a-row>
                                </a-menu-item>
                            </a-menu>
                        </a-menu>
                    </a-dropdown>
                    <a-divider type="vertical"/>
                    <a-dropdown placement="bottomRight">
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>{{ $t(dict.localeObj.comTable.size.title) }}</span>
                            </template>
                            <a-icon type="column-height" />
                        </a-tooltip>
                        <a-menu slot="overlay" v-model="sizePicked" selectable>
                            <a-menu-item v-for="(item, index) in sizeMap" :key="index">
                                {{ $t(item.name) }}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <a-divider type="vertical"/>
                    <a-tooltip :placement="isShrink ? 'bottomRight' : 'topRight'">
                        <template slot="title">
                            <span>{{ $t(isShrink ? dict.localeObj.comTable.unFullscreen : dict.localeObj.comTable.fullscreen) }}</span>
                        </template>
                        <a-icon :type="isShrink ? 'shrink' : 'arrows-alt'" @click="shrinkTable"/>
                    </a-tooltip>
                </a-col>
            </a-row>
        </div>
        <div class="n-common-table">
            <slot name="com-table"
                  :size-class="sizeMap[sizePicked[0]].class"
                  :row-key="defaultRowKey"
                  :select-columns="tbColumns"
                  :row-class="rowClass"
            ></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import utils from '@corets/utils'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'NCommonTable',
        mixins: [CoreBase, Base],
        props: {
            tableObj: {
                type: Object
            }
        },
        data () {
            return {
                sizeMap: {
                    small: {
                        name: dict.localeObj.comTable.size.small,
                        class: 'n-com-table-small'
                    },
                    normal: {
                        name: dict.localeObj.comTable.size.normal,
                        class: 'n-com-table-normal'
                    },
                    large: {
                        name: dict.localeObj.comTable.size.large,
                        class: 'n-com-table-large'
                    }
                },
                sizePicked: ['small'],
                columnsPicked: [],
                selectedColumns: [],
                tbColumns: [],
                checkAll: false,
                dropdownVisible: false,
                indeterminate: false,
                isShrink: false
            }
        },
        created () {
            const self = this as any
            self.init(true)
        },
        methods: {
            init (isChecked: boolean) {
                const self = this as any
                const newList: any[] = []
                self.tableObj.columns.forEach((item: any) => {
                    newList.push({
                        ...item,
                        isChecked,
                        pk: utils.randomCharacter(6)
                    })
                })
                self.selectedColumns = newList
                self.tbColumns = newList
                self.indeterminate = false
                self.checkAll = isChecked
            },
            defaultRowKey () {
                return utils.randomCharacter(12)
            },
            changeColumns () {
                const self = this as any
                const pickedList = self.selectedColumns.filter((item: any) => {
                    return item.isChecked
                })
                if (pickedList.length === 0) {
                    self.indeterminate = false
                    self.checkAll = false
                } else if (pickedList.length < self.selectedColumns.length) {
                    self.indeterminate = true
                    self.checkAll = false
                } else {
                    self.indeterminate = false
                    self.checkAll = true
                }
                self.tbColumns = pickedList
            },
            changeAllCheck (e: any) {
                const self = this
                if (!e.target.checked) {
                    self.init(false)
                    self.indeterminate = false
                    self.tbColumns = []
                } else {
                    self.init(true)
                }
            },
            fixedAction (idx: number, ftype: string) {
                const self = this as any
                const curPk = self.selectedColumns[idx].pk
                self.tbColumns.forEach((item: any, index: number) => {
                    if (item.pk === curPk) {
                        if (ftype !== 'cancel') {
                            if (item.fixed === ftype) {
                                self.$set(self.tbColumns[index], 'fixed', '')
                            } else {
                                self.$set(self.tbColumns[index], 'fixed', ftype)
                            }
                        } else {
                            self.$set(self.tbColumns[index], 'fixed', '')
                        }
                    }
                })
            },
            rowClass (record: any, index: any) {
                const classList = []
                // for stripe
                if (index % 2 === 1) {
                    classList.push('stripe-light')
                } else {
                    classList.push('stripe-dark')
                }
                return classList.join(' ')
            },
            shrinkTable () {
                const self = this as any
                self.isShrink = !self.isShrink
                utils.fullScreenCtl(self.isShrink)
            },
            triggerBtn (item: any) {
                const self = this as any
                self.$emit('btnevent', item.method)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/commontable.scss'
</style>
