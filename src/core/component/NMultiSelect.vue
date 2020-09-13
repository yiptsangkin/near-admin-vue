<template>
    <div>
        <a-select
                @focus="showDropdownMenu"
                @change="closeDropdownMenu"
                ref="multi-select"
                :open="multiSelectVisible"
                :dropdownClassName="`${$attrs.dropdownMatchSelectWidth ? '' : 'n-multi-select-dropdown-menu'}`"
                v-bind="$attrs"
                v-model="selectedValue"
                :style="computedParentWidth()"
        >
            <div ref="multi-dropdown" class="multi-dropdown" slot="dropdownRender" slot-scope="options">
                <a-row class="multi-title" type="flex">
                    <a-col v-for="(item, index) in optionColumns" :key="index" :style="computedWidth(item.width)">{{ item.title }}{{ showTitleField ? `(${item.field})` : ''}}</a-col>
                </a-row>
                <v-nodes :vnodes="options"/>
                <a-pagination
                    v-if="pagingInfo"
                    :page-size.sync="pagingInfo.pageSize"
                    :default-current="pagingInfo.currentPage"
                    :total="pagingInfo.totalRows"
                    :show-total="total => `${$t(dict.localeObj.pagingInfo.total)} ${total} ${$t(dict.localeObj.pagingInfo.uint)}${$t(dict.localeObj.pagingInfo.items)}`"
                    size="small"
                    hide-on-single-page
                    class="multi-pagination"
                    @change="changePage"
                ></a-pagination>
            </div>
            <a-select-option v-for="(item, index) in targetOption" :key="index" :value="item.value">
                <a-row class="multi-option" type="flex">
                    <a-col class="multi-option-index"></a-col>
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
            showOptionIndex: {
                type: Boolean,
                default: true
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
                default: null
            }
        },
        components: {
            VNodes: {
                functional: true,
                render: (h: any, ctx: any) => ctx.props.vnodes,
            }
        },
        created () {
            const self = this as any
            self.init()
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data () {
            return {
                dict,
                multiSelectVisible: false
            }
        },
        computed: {
            targetOption () {
                const self = this as any
                return self.optionFormatter(self.optionsList)
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
            }
        },
        methods: {
            init () {
                const self = this as any
                // set default dropdownMatchSelectWidth false
                if (!self.$attrs.dropdownMatchSelectWidth) {
                    self.$attrs.dropdownMatchSelectWidth = false
                }
                // blur control
                self.initGlobalClickClose()
            },
            computedWidth (width?: number | string ) {
                if (width) {
                    return `width: ${width}${typeof width === 'number' ? 'px;' : ''}`
                } else {
                    return `flex: 1;`
                }
            },
            computedParentWidth (isFullWidth?: boolean) {
                const self = this
                if ((self.optionColumns.length && self.$attrs.dropdownMatchSelectWidth) || isFullWidth) {
                    let totalWidth = 0
                    self.optionColumns.forEach((item) => {
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
                    // 24px is padding
                    return `width: ${totalWidth + 24}px;`
                } else {
                    return `width: 100px`
                }
            },
            changePage (current: any) {
                const self = this
                self.$emit('change-page', current)
            },
            showDropdownMenu () {
                const self = this as any
                self.multiSelectVisible = true
            },
            closeDropdownMenu () {
                const self = this as any
                self.multiSelectVisible = false
                self.$refs['multi-select'].blur()
            },
            initGlobalClickClose () {
                const self = this as any
                document.addEventListener('click', (e) => {
                    const multiSelect = self.$refs['multi-select'].$el
                    const multiDropdown = self.$refs['multi-dropdown']
                    if (!(multiSelect && multiSelect.contains(e.target)) && !(multiDropdown && multiDropdown.contains(e.target))) {
                        self.multiSelectVisible = false
                    }
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@corescss/manage/multiselect"
</style>

<style lang="scss">
    .n-multi-select-dropdown-menu{
        width: auto!important;
    }
</style>
