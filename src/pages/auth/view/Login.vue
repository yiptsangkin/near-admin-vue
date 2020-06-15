<template>
    <div class="n-login-ctx">
        <a-row class="n-login-lang-wrp">
            <n-lang-picker></n-lang-picker>
        </a-row>
        <a-row class="n-login-main-ctx">
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
        </a-row>
        <a-row class="n-login-copyright-wrp">
            <copy-right></copy-right>
        </a-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    const LoginForm = () => import('../component/login/LoginForm')
    const NLangPicker = () => import('@corecp/NLangPicker.vue')
    const CopyRight = () => import('../component/common/CopyRight')
    export default {
        name: 'Login',
        components: {
            LoginForm,
            NLangPicker,
            CopyRight
        },
        computed: {
            ...mapGetters([
                'comConfig'
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import '~@scss/custom/auth/login.scss'
</style>
