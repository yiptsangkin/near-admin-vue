<template>
    <div>
        <a-input v-model="a"></a-input>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'

    export default Vue.extend({
        name: 'HelloWorld2',
        mixins: [CoreBase, Base],
        data() {
            return {
                a: ''
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
