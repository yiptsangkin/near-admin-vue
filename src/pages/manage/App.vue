<template>
    <a-config-provider :locale="gloablLocale[locale]">
        <div class="n-main-ctx">
            <router-view></router-view>
        </div>
    </a-config-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import Root from '@ts/core/root'
import utils from '@ts/core/utils'
import { mapGetters } from 'vuex'

export default Vue.extend({
    name: 'App',
    extends: Root,
    created () {
        // global log tool
        window.Logline = utils.loglineObj
    },
    computed: {
        ...mapGetters([
            'locale',
            'gloablLocale'
        ])
    }
})
</script>

<style lang="scss">
    @import '../../assets/font/iconfont/iconfont.css';
    @import '../../assets/scss/core/base.scss';
</style>
