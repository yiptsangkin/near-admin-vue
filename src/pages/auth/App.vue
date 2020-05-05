<template>
    <a-config-provider :locale="gloablLocale[locale]">
        <div class="n-main-ctx">
            <router-view></router-view>
        </div>
    </a-config-provider>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreRoot from '@ts/core/root'
    import Root from '@ts/custom/root'

    export default Vue.extend({
        name: 'App',
        mixins: [CoreRoot, Root]
    })
</script>

<style lang="css">
    @import '~@font/iconfont/iconfont.css';
</style>

<style lang="scss">
    @import '~@scss/custom/index.scss';
</style>
