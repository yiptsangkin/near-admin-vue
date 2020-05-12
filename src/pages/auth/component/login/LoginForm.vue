<template>
    <div class="n-login-form">
        <div class="n-login-tabs-wrp">
            <a-tabs :default-active-key="defaultKey" class="n-login-tabs">
                <a-tab-pane :tab="$t(item.name)" v-for="(item, index) in tabPaneList" :key="item.key">
                    <component ref="form-detail" :is="item.component"></component>
                </a-tab-pane>
            </a-tabs>
            <login-bottom @login="toLogin"></login-bottom>
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
        },
        methods: {
            toLogin () {
                const self = this
                const formDetail = self.$refs['form-detail']
                if (Array.isArray(formDetail) && formDetail) {
                    const formRef = 'formModel'
                    // @ts-ignore
                    formDetail[0].$refs[formRef].validate((valid: any) => {
                        console.log(valid)
                    })
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@scss/custom/auth/component/loginform.scss";
</style>
