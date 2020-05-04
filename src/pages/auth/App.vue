<template>
    <div class="n-main-ctx">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Root from '@ts/core/root'

export default Vue.extend({
    name: 'App',
    extends: Root
})
</script>

<style lang="scss">
    @import '../../assets/font/iconfont/iconfont.css';
    @import '../../assets/scss/core/base.scss';
</style>
