<template>
    <div class="n-common-table-wrp">
        <div class="n-common-table-title">
            <a-row>
                <a-col :span="8">{{ $t(tableObj.title) }}</a-col>
                <a-col class="n-common-table-btn-ctl" :span="16">
                    <a-button class="n-common-table-btn" :type="item.type || 'primary'" size="small" v-for="(item, index) in tableObj.btnList" :key="index">{{ $t(item.name) }}</a-button>
                    <a-divider type="vertical" />
                    <a-dropdown>
                        <a-icon type="setting" />
                    </a-dropdown>
                </a-col>
            </a-row>
        </div>
        <div class="n-common-table">
            <slot name="com-table"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'

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
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/commontable.scss'
</style>
