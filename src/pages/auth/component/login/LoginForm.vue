<template>
    <div class="n-login-form">
        <div class="n-login-tabs-wrp">
            <a-tabs :default-active-key="defaultKey" class="n-login-tabs">
                <a-tab-pane :tab="$t(item.name)" v-for="item in tabPaneList" :key="item.key">
                    <component :is="item.component"></component>
                </a-tab-pane>
            </a-tabs>
            <login-bottom></login-bottom>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    const LoginByAccount = () => import('./LoginByAccount.vue')
    const LoginByPhone = () => import('./LoginByPhone.vue')
    const LoginBottom = () => import('./LoginBottom.vue')
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'LoginForm',
        components: {
            LoginByAccount,
            LoginByPhone,
            LoginBottom
        },
        data () {
            return {
                defaultKey: 1,
                tabPaneList: [
                    {
                        key: 1,
                        name: dict.localeObj.loginForm.byAccountBtn,
                        component: LoginByAccount
                    },
                    {
                        key: 2,
                        name: dict.localeObj.loginForm.byPhoneBtn,
                        component: LoginByPhone
                    }
                ]
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@scss/custom/auth/component/loginform.scss";
</style>
