<template>
    <div>
        <a-input v-model="a"></a-input>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'HomePage',
        data() {
            return {
                a: ''
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
