<template>
    <div>
        <a-select
                @focus="showDropdownMenu"
                ref="multi-select"
                :open="multiSelectVisible"
                v-bind="$attrs"
                v-model="selectedValue"
                :style="computedParentWidth()"
                :option-label-prop="$attrs.optionLabelProp ? $attrs.optionLabelProp : 'label'"
                :dropdown-match-select-width="$attrs.dropdownMatchSelectWidth || false"
                @select="emitSelect"
                @search="emitSearch"
                @blur="hideDropdownMenu"
        >
            <div ref="multi-dropdown" class="multi-dropdown" slot="dropdownRender" slot-scope="options">
                <a-row class="multi-title" type="flex">
                    <a-col key="multi-sort" style="width: 55px" v-if="showSortIndex">序号</a-col>
                    <a-col v-for="(item, index) in optionColumns" :key="index" :style="computedWidth(item.width)">{{ item.title }}{{ showTitleField ? `(${item.field})` : ''}}</a-col>
                </a-row>
                <v-nodes :vnodes="options"/>
                <a-pagination
                    v-if="pagingInfo"
                    :page-size.sync="pagingInfo.pageSize"
                    :default-current="pagingInfo.currentPage"
                    :total="totalRows"
                    :show-total="total => `${$t(dict.localeObj.pagingInfo.total)} ${total} ${$t(dict.localeObj.pagingInfo.uint)}${$t(dict.localeObj.pagingInfo.items)}`"
                    size="small"
                    hide-on-single-page
                    class="multi-pagination"
                    @change="changePage"
                ></a-pagination>
            </div>
            <a-select-option v-for="(item, index) in targetOption" :key="index" :value="item[valueProps]" :title="item[titleProps]" :label="item[labelProps]">
                <a-row class="multi-option" type="flex">
                    <a-col class="multi-option-index" style="width: 50px" v-if="showSortIndex">
                        {{ pagingInfo ? ((pagingInfo.currentPage - 1) * pagingInfo.pageSize + index + 1) : index + 1 }}</a-col>
                    <a-col v-for="(citem, cindex) in optionColumns" :key="cindex" :style="computedWidth(citem.width)">
                        {{ item[citem.field] }}
                    </a-col>
                </a-row>
            </a-select-option>
        </a-select>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {MultiSelectColumn, PagingInfo} from '@corets/type'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'NMultiSelect',
        props: {
            optionColumns: {
                type: Array as () => MultiSelectColumn[]
            },
            optionsList: {
                type: Array
            },
            showTitleField: {
                type: Boolean,
                default: false
            },
            optionFormatter: {
                type: Function,
                default () {
                    const self = this as any
                    return self.optionsList
                }
            },
            pagingInfo: {
                type: Object as () => PagingInfo
            },
            value: {
                default: undefined
            },
            valueProps: {
                type: String,
                default: 'value'
            },
            titleProps: {
                type: String,
                default: 'value'
            },
            labelProps: {
                type: String,
                default: 'label'
            },
            showSortIndex: {
                type: Boolean,
                default: true
            },
            remote: {
                type: Boolean,
                default: false
            }
        },
        components: {
            VNodes: {
                functional: true,
                render: (h: any, ctx: any) => ctx.props.vnodes,
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data () {
            return {
                dict,
                multiSelectVisible: false,
                cacheSearchText: undefined,
                pageSwitch: 0
            }
        },
        watch: {
            optionsList: {
                handler () {
                    const self = this as any
                    self.placementWatcher()
                },
                immediate: true
            },
            multiSelectVisible: {
                handler () {
                    const self = this as any
                    self.placementWatcher()
                },
                immediate: true
            },
            '$attrs.disabled': {
                handler (nv) {
                    if (nv) {
                        const self = this as any
                        self.multiSelectVisible = false
                    }
                },
                immediate: true
            }
        },
        computed: {
            targetOption () {
                const self = this as any
                return self.initPageControl(self.optionFormatter(self.optionsList))
            },
            selectedValue: {
                get () {
                    const self = this as any
                    return self.value
                },
                set (val) {
                    const self = this as any
                    self.$emit('change', val)
                }
            },
            totalRows () {
                const self = this as any
                if (!self.pagingInfo.totalRows) {
                    return self.optionFormatter(self.optionsList).length
                } else {
                    return self.pagingInfo.totalRows
                }
            }
        },
        methods: {
            computedWidth (width?: number | string ) {
                if (width) {
                    return `width: ${width}${typeof width === 'number' ? 'px;' : ''}`
                } else {
                    return `flex: 1;`
                }
            },
            computedParentWidth (isFullWidth?: boolean) {
                const self = this as any
                if ((self.optionColumns.length && self.$attrs.dropdownMatchSelectWidth) || isFullWidth) {
                    let totalWidth = 0
                    self.optionColumns.forEach((item: any) => {
                        if (item.width) {
                            if (typeof item.width === 'number') {
                                totalWidth += item.width
                            } else {
                                totalWidth += parseInt(item.width, 10)
                            }
                        } else {
                            // default 120
                            totalWidth += 120
                        }
                    })
                    // 24px is padding, 55px is sort index
                    return `width: ${totalWidth + 24 + (self.showSortIndex ? 55 : 0)}px;`
                } else {
                    return  `width: ${self.showSortIndex ? 155 : 100}px`
                }
            },
            changePage (current: any) {
                const self = this
                self.pageSwitch++
                self.$emit('changepage', current)
            },
            showDropdownMenu () {
                const self = this as any
                self.multiSelectVisible = true
            },
            initPageControl (optionList: any[]) {
                // if is remote, not need to control page, else control static data.
                const self = this as any
                if (self.remote) {
                    return optionList
                } else {
                    // check if pagingInfo
                    if (self.pagingInfo) {
                        const newList = Object.assign([], optionList)
                        return newList.splice(
                            (self.pagingInfo.currentPage - 1) * self.pagingInfo.pageSize,
                            self.pagingInfo.pageSize
                        )
                    } else {
                        return optionList
                    }
                }
            },
            emitSelect (val: any) {
                const self = this as any
                if (self.pageSwitch === 1) {
                    self.multiSelectVisible = true
                } else {
                    self.multiSelectVisible = false
                }
                self.pageSwitch = 0
                self.$emit('select', val)
            },
            emitSearch (val: any) {
                const self = this as any
                self.cacheSearchText = val
                self.$emit('search', val)
            },
            placementWatcher () {
                const self = this as any
                self.$nextTick(() => {
                    const multiSelect = self.$refs['multi-select'] ? self.$refs['multi-select'].$el : null
                    const multiDropdown = self.$refs['multi-dropdown']
                    if (multiDropdown) {
                        self.$nextTick(() => {
                            const selectWidth = parseInt(getComputedStyle(multiSelect).width, 10)
                            const dropdownWidth = parseInt(getComputedStyle(multiDropdown).width, 10)
                            const dropdownLeft = parseInt(getComputedStyle(multiDropdown.parentElement).left, 10)
                            const windowInnerWidth = window.innerWidth
                            if (dropdownLeft + dropdownWidth > windowInnerWidth) {
                                // select overflow
                                setTimeout(() => {
                                    multiDropdown.parentElement.style.left = `${dropdownLeft - dropdownWidth + selectWidth}px`
                                }, 0)
                            }
                        })
                    }
                })
            },
            hideDropdownMenu () {
                const self = this as any
                if (self.pageSwitch !== 1) {
                    self.multiSelectVisible = false
                    self.pageSwitch = 0
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@corescss/manage/multiselect"
</style>
