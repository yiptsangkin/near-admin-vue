<template>
    <div class="n-login-ctx">
        <a-row class="n-login-lang-wrp">
            <lang-picker></lang-picker>
        </a-row>
        <a-row class="n-login-logo-wrp" :gutter="[18, 0]">
            <a-col class="n-sys-logo">
                <img :src="comConfig.sysInfo.logo" alt="">
            </a-col>
            <a-col class="n-sys-name">{{ comConfig.sysInfo.name }}</a-col>
        </a-row>
        <a-row class="n-login-logo-description">
            {{ $t(comConfig.sysInfo.description) }}
        </a-row>
        <a-row class="n-login-form-wrp">
            <login-form></login-form>
        </a-row>
        <a-row class="n-login-copyright-wrp"></a-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    const LoginForm = () => import('../component/login/LoginForm')
    const LangPicker = () => import('../component/common/LangPicker')
    export default {
        name: 'Login',
        components: {
            LoginForm,
            LangPicker
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
