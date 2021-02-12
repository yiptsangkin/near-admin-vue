// @ts-nocheck
<template>
    <div :class="['n-common-table-wrp', isShrink ? 'n-full-common-table' : '']">
        <n-common-operation-bar ref="op-bar" :operation-obj="tableObj" @btnevent="triggerEvent" @fullscreen="setFullScreen">
            <template slot="n-com-function">
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
            </template>
        </n-common-operation-bar>
        <div :class="['n-common-table', sizeMap[sizePicked[0]].class]"
             ref="n-com-slot-table">
            <slot name="n-com-table"
                  :size-class="sizeMap[sizePicked[0]].class"
                  :select-columns="tbColumns"
                  :inner-height="innerHeight"
                  :row-class="rowClass"
                  :resize-title="resizeTitle"
            ></slot>
        </div>
    </div>
</template>

<script lang="tsx">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import utils from '@corets/utils'
    import dict from '@custom/dict'
    import NCommonOperationBar from '@corecp/NCommonOperationBar.vue'
    import VueDraggableResizable from 'vue-draggable-resizable'

    Vue.component('vue-draggable-resizable', VueDraggableResizable)

    export default Vue.extend({
        name: 'NCommonTable',
        mixins: [CoreBase, Base],
        props: {
            tableObj: {
                type: Object
            },
            offsetDist: {
                type: Number,
                default: 0
            }
        },
        components: {
            NCommonOperationBar
        },
        watch: {
            'tableObj.data': {
                handler (nv, ov) {
                    const self = this as any
                    if (self.$scopedSlots['n-com-table']) {
                        self.$nextTick(() => {
                            self.getCommonTableHeight()
                        })
                    }
                },
                immediate: true,
                deep: true
            },
            'tableObj.columns': {
                handler (nv, ov) {
                    const self = this as any
                    self.init(true)
                },
                immediate: true,
                deep: true
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
                originColumsProps: [],
                sizePicked: ['small'],
                columnsPicked: [],
                selectedColumns: [],
                tbColumns: [],
                checkAll: false,
                dropdownVisible: false,
                indeterminate: false,
                isShrink: false,
                tableHeight: '100%',
                resizeTitle: undefined
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
                self.originColumsProps = [...newList]
                self.selectedColumns = newList
                self.tbColumns = newList
                self.indeterminate = false
                self.checkAll = isChecked
                self.getCommonTableHeight()
                self.setResizable()
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
                                self.$set(self.originColumsProps[index], 'fixed', '')
                            } else {
                                self.$set(self.tbColumns[index], 'fixed', ftype)
                                self.$set(self.originColumsProps[index], 'fixed', ftype)
                            }
                        } else {
                            self.$set(self.tbColumns[index], 'fixed', '')
                            self.$set(self.originColumsProps[index], 'fixed', '')
                        }
                    }
                })
                self.resortColums()
            },
            resortColums() {
                const self = this as any
                const hmap = { left: [], notFixed: [], right: [] } as any
                for (let i = 0; i < self.originColumsProps.length; i++) {
                    const currentItem = self.originColumsProps[i]
                    if ('fixed' in currentItem) {
                        if (currentItem.fixed === 'left') {
                            hmap['left'].push(currentItem)
                        } else if (currentItem.fixed === 'right') {
                            hmap['right'].push(currentItem)
                        } else {
                            hmap['notFixed'].push(currentItem)
                        }
                    } else {
                        hmap['notFixed'].push(currentItem)
                    }
                }
                self.tbColumns = [].concat(hmap['left'], hmap['notFixed'], hmap['right'])
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
            triggerEvent (method: any, params: any) {
                const self = this as any
                self.$emit('btnevent', method, params)
            },
            setFullScreen (isShrink: boolean) {
                const self = this as any
                self.isShrink = isShrink
            },
            getCommonTableHeight () {
                const self = this as any
                let oneLineDist = 35
                if (self.sizePicked[0] === 'small') {
                    oneLineDist = 35
                } else if (self.sizePicked[0] === 'normal') {
                    oneLineDist = 40
                } else if (self.sizePicked[0] === 'large') {
                    oneLineDist = 46
                }
                const tableWrapper = self.$refs['n-com-slot-table']?.querySelector('.ant-table-wrapper')
                if (tableWrapper) {
                    self.innerHeight = parseInt(getComputedStyle(tableWrapper).height, 10) - oneLineDist - self.offsetDist
                } else {
                    self.innerHeight = 240
                }
            },
            setResizable () {
                const self = this as any
                const draggingMap: any = {}
                self.tbColumns.forEach((col: any) => {
                    draggingMap[col.key] = col.width
                });
                const draggingState = Vue.observable(draggingMap)
                const resizeTitle = (h: any, props: any, children: any) => {
                    let thDom: any
                    const { key, ...restProps } = props
                    const col = self.tbColumns.find((colItem: any) => {
                        const k = colItem.dataIndex || colItem.key
                        return k === key
                    })
                    if (!col || !col.width) {
                        return <th {...restProps}>{children}</th>
                    }
                    const onDrag = (x: any, y: any) => {
                        draggingState[key] = 0
                        col.width = Math.max(x, 1)
                    }

                    const onDragStop = () => {
                        draggingState[key] = thDom.getBoundingClientRect().width
                    }
                    return (
                        <th
                            {...restProps}
                            v-ant-ref={(r: any) => (thDom = r)}
                            width={col.width}
                            class='resize-table-th'
                        >
                            {children}
                            <vue-draggable-resizable
                                key={col.key}
                                class='table-draggable-handle'
                                w={10}
                                x={draggingState[key] || col.width}
                                z={1}
                                axis='x'
                                draggable={true}
                                resizable={false}
                                onDragging={onDrag}
                                onDragstop={onDragStop}
                            />
                        </th>
                    )
                }
                self.resizeTitle = {
                    header: {
                        cell: resizeTitle,
                    }
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/commontable.scss'
</style>
