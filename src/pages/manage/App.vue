<template>
    <div class="n-main-ctx">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Root from '@js/root'
import utils from '@js/utils'

export default Vue.extend({
    name: 'App',
    extends: Root,
    created () {
        // global log tool
        window.Logline = utils.loglineObj
    }
})
</script>

<style lang="css">
    @import '../../assets/font/iconfont/iconfont.css';
</style>
