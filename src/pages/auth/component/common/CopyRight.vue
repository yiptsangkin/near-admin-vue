<template>
    <footer class="n-copyright">
        <div class="github-icon">
            <a :href="dict.commonObj.copyright.githubUrl" target="_blank"><a-icon type="github" /></a>
        </div>
        <div class="copy-right-text">
            Copyright <a-icon type="copyright" /> 2020 Near Yip
        </div>
    </footer>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'CopyRight',
        data() {
            return {
                dict
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '~@scss/custom/auth/component/copyright.scss'
</style>
