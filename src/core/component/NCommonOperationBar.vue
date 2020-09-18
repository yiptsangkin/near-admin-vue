<template>
    <div class="n-common-bar-title">
        <a-row>
            <a-col :span="8">{{ $t(operationObj.title) }}</a-col>
            <a-col class="n-common-bar-btn-ctl" :span="16">
                <a-button class="n-common-bar-btn" :type="item.type || 'primary'" size="small" v-for="(item, index) in operationObj.btnList" @click="triggerBtn(item.method)" :key="index">{{ $t(item.name) }}</a-button>
                <a-divider type="vertical"/>
                <slot name="n-com-function"></slot>
                <a-tooltip :placement="isShrink ? 'bottomRight' : 'topRight'">
                    <template slot="title">
                        <span>{{ $t(isShrink ? dict.localeObj.comTable.unFullscreen : dict.localeObj.comTable.fullscreen) }}</span>
                    </template>
                    <a-icon :type="isShrink ? 'shrink' : 'arrows-alt'" @click="shrinkContent"/>
                </a-tooltip>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {OperationBar} from '@corets/type'
    import utils from '@corets/utils'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'NCommonOperationBar',

        props: {
            operationObj: {
                type: Object as () => OperationBar
            }
        },

        data () {
            return {
                dict,
                isShrink: false
            }
        },

        methods: {
            shrinkContent () {
                const self = this as any
                self.isShrink = !self.isShrink
                utils.fullScreenCtl(self.isShrink)
            },
            triggerBtn (method: any) {
                const self = this as any
                console.log(method)
                self.$emit('btnevent', method)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/comoperationbar'
</style>
