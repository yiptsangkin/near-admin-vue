<template>
    <a-config-provider :locale="gloablLocale[locale]">
        <div class="n-main-ctx">
            <router-view></router-view>
        </div>
    </a-config-provider>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreRoot from '@core/root'
    import Root from '@custom/root'
    import ManageRoot from '@custom/mroot'

    export default Vue.extend({
        name: 'App',
        mixins: [CoreRoot, Root, ManageRoot]
    })
</script>

<style lang="css">
    @import '~@font/iconfont/iconfont.css';
</style>

<style lang="scss">
    @import '~@scss/custom/index.scss';
</style>
