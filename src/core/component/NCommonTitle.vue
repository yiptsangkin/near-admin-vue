<template>
    <div :class="['n-common-title', noTop ? 'no-top' : '']">{{ $t(title) }}</div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'NCommonTitle',
        props: {
            title: {
              type: String
            },
            noTop: {
                type: Boolean
            }
        },
        data () {
            return {
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@corescss/manage/commontitle.scss"
</style>
