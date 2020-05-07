<template>
    <div class="n-login-by-account">
        <a-form-model :model="formModel">
            <a-form-model-item>
                <a-input v-model="formModel.account.value" :placeholder="$t(formModel.account.placeholder)">
                    <a-icon slot="prefix" :type="formModel.account.prefixIconType" style=""/>
                </a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-input v-model="formModel.password.value" :placeholder="$t(formModel.password.placeholder)" :type="formModel.password.inputType">
                    <a-icon slot="prefix" :type="formModel.password.prefixIconType" style=""/>
                </a-input>
            </a-form-model-item>

        </a-form-model>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'
    import {CommonInput} from '@core/formtype'
    interface FormModel {
        account: CommonInput,
        password: CommonInput
    }

    interface LoginByAccountData {
        formModel: FormModel
    }

    export default Vue.extend({
        name: 'LoginByAccount',
        data () {
            const data: LoginByAccountData = {
                formModel: {
                    account: {
                        placeholder: dict.localeObj.loginForm.accountPlaceholder,
                        value: '',
                        prefixIconType: 'user'
                    },
                    password: {
                        placeholder: dict.localeObj.loginForm.passwordPlaceholder,
                        value: '',
                        inputType: 'password',
                        prefixIconType: 'lock'
                    }
                }
            }
            return data
        }
    })
</script>

<style lang="scss" scoped>
</style>
