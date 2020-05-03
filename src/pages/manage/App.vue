<template>
    <a-config-provider :locale="gloablLocale[locale].antdLocale">
        <div class="n-main-ctx">
            <router-view></router-view>
        </div>
    </a-config-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import Root from '@js/core/root'
import utils from '@js/core/utils'
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

<style lang="css">
    @import '../../assets/font/iconfont/iconfont.css';
</style>
