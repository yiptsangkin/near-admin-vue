<template>
    <div class="n-search-panel-wrp">
        <div class="n-search-panel-btn-wrp">
            <a-button size="small" class="n-search-panel-btn" @click="shrink">
                {{ isShrink ? $t(dict.localeObj.searchPanel.btn.unshrink) : $t(dict.localeObj.searchPanel.btn.shrink) }}
            </a-button>
            <a-button size="small" class="n-search-panel-btn" @click="reset">
                {{ $t(dict.localeObj.searchPanel.btn.reset) }}
            </a-button>
            <a-button type="primary" size="small" class="n-search-panel-btn" @click="search">
                {{ $t(dict.localeObj.searchPanel.btn.search) }}
            </a-button>
        </div>
        <slot name="n-search-ctx" :shrink-switch="isShrink"></slot>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'

    export default Vue.extend({
        name: 'NSearchPanel',
        mixins: [CoreBase, Base],
        data () {
            return {
                isShrink: false
            }
        },
        methods: {
            shrink () {
                const self = this
                self.isShrink = !self.isShrink
            },
            reset () {
                const self = this
                self.$emit('reset')
            },
            search () {
                const self = this
                self.$emit('search')
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/searchpanel.scss'
</style>
