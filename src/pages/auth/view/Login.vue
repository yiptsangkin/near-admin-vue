<template>
    <div class="n-login-ctx">
        <a-row class="n-login-lang-wrp">
            <div class="n-global-locale">
                <a-dropdown :trigger="['click']">
                    <a-icon type="global" class="n-locale-icon"/>
                    <a-menu slot="overlay" @click="pickLocale">
                        <a-menu-item v-for="(item, index) in ableLocaleList" :key="index">
                            <a target="_blank" rel="noopener noreferrer">{{ ableLocaleMap[item].localeMap[item] }}</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
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
    export default {
        name: 'Login',
        components: {
            LoginForm
        },
        computed: {
            ...mapGetters([
                'comConfig',
                'gloablLocale'
            ]),
            ableLocaleList () {
                const self = this
                return self.$i18n.availableLocales
            },
            ableLocaleMap () {
                const self = this
                return self.$i18n.messages
            }
        },
        methods: {
            pickLocale ({ item, key, keyPath, domEvent }) {
                const self = this
                self.$i18n.locale = self.ableLocaleList[key]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@scss/custom/auth/login';
</style>
