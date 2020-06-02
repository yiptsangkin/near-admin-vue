<template>
    <button @click="addNewPage">add new page</button>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'

    export default Vue.extend({
        name: 'HomePage',
        mixins: [CoreBase, Base],
        data () {
            return {
            }
        },
        methods: {
            addNewPage () {
                const self = this as any
                self.$newpage({
                    component: 'home/HomePage',
                    title: 'test'
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
