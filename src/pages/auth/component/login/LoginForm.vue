<template>
    <div class="n-login-form">
        <a-tabs :default-active-key="defaultKey" class="n-login-tabs">
            <a-tab-pane :tab="item.name" v-for="item in tabPaneList" :key="item.key">
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'LoginForm',
        data () {
            return {
                defaultKey: 1,
                tabPaneList: [
                    {
                        key: 1,
                        name: '账户密码登录'
                    },
                    {
                        key: 2,
                        name: '手机号登录'
                    }
                ]
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@scss/custom/auth/component/loginform.scss";
</style>
