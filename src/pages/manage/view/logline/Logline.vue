<template>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'

    export default Vue.extend({
        name: 'Logline',
        mixins: [CoreBase, Base],
        data () {
            return {
            }
        },
        methods: {
            exportLog () {
                console.log('to export log file')
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
