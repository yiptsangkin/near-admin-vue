<template>
    <div class="n-tag-ctx-menu-wrp" v-if="showCtxMenu" :style="curCtxPosStyle">
        <a-menu class="n-tag-ctx-menu">
            <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeCur) }}</a>
            </a-menu-item>
            <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeRight) }}</a>
            </a-menu-item>
            <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeOther) }}</a>
            </a-menu-item>
            <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeAll) }}</a>
            </a-menu-item>
            <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.singlePage) }}</a>
            </a-menu-item>
            <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.refreshPage) }}</a>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters} from 'vuex'
    import dict from '@custom/dict'
    import bus from '@corets/eventbus'

    export default Vue.extend({
        name: 'NTagContentMenu',
        data () {
            return {
                dict,
                showCtxMenu: false,
                curCtxPos: {
                    x: 0,
                    y: 0
                }
            }
        },
        computed: {
            ...mapGetters([
                'curTagIndex'
            ]),
            curCtxPosStyle () {
                const self = this as any as any
                return `margin-top: ${self.curCtxPos.y}px; margin-left: ${self.curCtxPos.x}px`
            }
        },
        methods: {
            initBusEvent () {
                const self = this as any
                bus.$off('tagCtxMenu').$on('tagCtxMenu', (val: any) => {
                    self.showCtxMenu = true
                })
            }
        },
        created () {
            const self = this as any
            self.initBusEvent()
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/tagmenu.scss'
</style>
