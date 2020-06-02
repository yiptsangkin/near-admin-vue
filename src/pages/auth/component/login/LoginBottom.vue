<template>
    <div class="n-login-bottom">
        <div class="n-login-option clear">
            <a-checkbox-group v-model="formModel.autoLogin.pickedLists">
                <a-checkbox :value="formModel.autoLogin.value" name="autologin">
                    {{ $t(formModel.autoLogin.placeholder) }}
                </a-checkbox>
            </a-checkbox-group>
            <a class="n-login-forget">
                {{ $t(formModel.forgotBtn.placeholder) }}
            </a>
        </div>
        <div class="n-login-submit">
            <a-button type="primary" block size="large" @click="toLogin">{{ $t(formModel.loginBtn.text) }}</a-button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'

    interface FormModel {
        autoLogin: any,
        forgotBtn: any,
        loginBtn: any
    }

    interface LoginBottom {
        formModel: FormModel
    }

    export default Vue.extend({
        name: 'LoginBottom',
        data() {
            const data: LoginBottom = {
                formModel: {
                    autoLogin: {
                        pickedLists: [],
                        value: true,
                        placeholder: dict.localeObj.loginForm.autoLoginPlaceholder
                    },
                    forgotBtn: {
                        placeholder: dict.localeObj.loginForm.forgetBtn
                    },
                    loginBtn: {
                        text: dict.localeObj.loginForm.loginBtn
                    }
                }
            }
            return data
        },
        methods: {
            toLogin () {
                const self = this as any
                self.$emit('login')
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import "~@scss/custom/auth/component/loginbottom.scss";
</style>
