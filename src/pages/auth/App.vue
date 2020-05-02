<template>
    <div class="n-main-ctx">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Root from '@js/core/root'

export default Vue.extend({
    name: 'App',
    extends: Root
})
</script>

<style lang="css">
    @import '../../assets/font/iconfont/iconfont.css';
</style>
