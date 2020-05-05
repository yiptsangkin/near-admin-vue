<template>
    <div class="n-login-ctx">
        <a-row class="n-login-lang-wrp">
        </a-row>
        <a-row class="n-login-log-wrp">
            <al-col>
                <img :src="comConfig.sysInfo.logo" alt="">
            </al-col>
            <al-col>{{ comConfig.sysInfo.name }}</al-col>
        </a-row>
        <a-row class="n-login-form-wrp"></a-row>
        <a-row class="n-login-copyright-wrp"></a-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Login',
        computed: {
            ...mapGetters([
                'comConfig'
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import '~@scss/custom/auth/login';
</style>
