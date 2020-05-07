<template>
    <div class="n-login-ctx">
        <a-row class="n-login-lang-wrp">
        </a-row>
        <a-row class="n-login-logo-wrp" type="flex" justify="center" align="middle" :gutter="[18, 0]">
            <a-col class="n-sys-logo">
                <img :src="comConfig.sysInfo.logo" alt="">
            </a-col>
            <al-col class="n-sys-name">{{ comConfig.sysInfo.name }}</al-col>
        </a-row>
        <a-row class="n-login-logo-description">
            {{ comConfig.sysInfo.description }}
        </a-row>
        <a-row class="n-login-form-wrp">
            <login-form></login-form>
        </a-row>
        <a-row class="n-login-copyright-wrp"></a-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import LoginForm from '../component/login/LoginForm'
    export default {
        name: 'Login',
        components: {
            LoginForm
        },
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
