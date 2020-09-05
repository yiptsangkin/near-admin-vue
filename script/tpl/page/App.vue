<template>
    <a-config-provider :locale="gloablLocale[locale]">
        <div class="n-main-ctx ovh">
            <router-view></router-view>
        </div>
    </a-config-provider>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreRoot from '@corets/root'

    export default Vue.extend({
        name: 'App',
        mixins: [CoreRoot]
    })
</script>

<style lang="css">
    @import '~@font/iconfont/iconfont.css';
</style>

<style lang="scss">
    @import '~@scss/custom/index.scss'
</style>
