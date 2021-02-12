<template>
    <div class="n-login-by-account">
        <a-form-model class="n-form" :model="formModel" ref="formModel" :rules="formModel.rules">
            <a-form-model-item prop="account.value">
                <n-smart-input @pressEnter="toLogin" v-model="formModel.account.value" autocomplete="autocomplete" name="name" :placeholder="$t(formModel.account.placeholder)" :input-formatter="fUserCode">
                    <a-icon slot="prefix" :type="formModel.account.prefixIconType" class="primary-color"/>
                </n-smart-input>
            </a-form-model-item>
            <a-form-model-item prop="password.value">
                <a-input-password @pressEnter="toLogin" autocomplete="current-password" v-model="formModel.password.value" :placeholder="$t(formModel.password.placeholder)" :type="formModel.password.inputType" visibility-toggle>
                    <a-icon slot="prefix" :type="formModel.password.prefixIconType" class="primary-color"/>
                </a-input-password>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'
    import utils from '@corets/utils'
    import {CommonInput} from '@corets/formtype'
    import {mapGetters} from 'vuex'
    import NSmartInput from '@corecp/NSmartInput.vue'

    interface FormModel {
        account: CommonInput,
        password: CommonInput,
        rules: any
    }

    interface CheckRules {
        [key: string]: any[]
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
                    },
                    rules: {}
                }
            }
            return data
        },

        components: {
            NSmartInput
        },
        computed: {
            ...mapGetters([
                'locale'
            ])
        },
        watch: {
            locale () {
                // change locale to initRules for i18n show
                const self = this as any
                self.$refs.formModel.clearValidate()
                self.initRules()
            }
        },
        created () {
            const self = this as any
            self.initRules()
        },
        methods: {
            initRules () {
                const self = this as any
                self.formModel.rules = {
                    ['account.value']: [
                        {
                            required: true,
                            message: self.$t(dict.localeObj.loginForm.accountEmptyErr),
                            trigger: 'blur'
                        }
                    ],
                    ['password.value']: [
                        {
                            required: true,
                            message: self.$t(dict.localeObj.loginForm.passwordEmptyErr),
                            trigger: 'blur'
                        }
                    ]
                }
            },
            toLogin () {
                const self = this as any
                self.$emit('login')
            },
            fUserCode: utils.fUserCode
        }
    })
</script>

<style lang="scss" scoped>
</style>
