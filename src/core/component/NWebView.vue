<template>
    <iframe :src="cpParams.dataUrl" frameborder="0" class="n-iframe"></iframe>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'

    export default Vue.extend({
        name: 'NWebView',
        mixins: [CoreBase],
        data() {
            return {};
        }
    });
</script>

<style lang="scss" scoped>
    @import "~@corescss/manage/iframe.scss";
</style>
