<template>
    <div class="n-search-panel-wrp">
        <div class="n-search-panel-btn-wrp">
            <a-button size="small" class="n-search-panel-btn" @click="shrink">
                {{ $t(dict.searchPanel.btn.shrink) }}
            </a-button>
            <a-button size="small" class="n-search-panel-btn" @click="reset">
                {{ $t(dict.searchPanel.btn.reset) }}
            </a-button>
            <a-button type="primary" size="small" class="n-search-panel-btn" @click="search">
                {{ $t(dict.searchPanel.btn.search) }}
            </a-button>
        </div>
        <slot name="n-search-ctx"></slot>
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
            }
        },
        methods: {
            shrink () {
                const self = this
                self.$emit('shrink')
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
