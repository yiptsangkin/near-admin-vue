<template>
    <a-layout-header class="n-layout-header">
        <div class="n-header-ham">
            <a-icon type="menu" />
        </div>
        <div class="n-header-sys-name">{{ comConfig.sysInfo.name }}</div>
        <div class="n-header-nav">
            <a-menu mode="horizontal" :selectedKeys="curMenu" @select="changeMenu">
                <a-menu-item :key="index" v-for="(item, index) in menuObj.menuList">
                    <a-icon :type="item.icon" v-if="item.icon"/>{{ $t(item.name) }}
                </a-menu-item>
            </a-menu>
        </div>
        <div class="n-header-right-part">
            <n-lang-picker class="n-com-head-func"></n-lang-picker>
            <a-dropdown>
                <div class="n-user-avatar n-com-head-func">
                    <img :src="userInfo.avatar" alt="">
                </div>
                <div class="n-user-info-pannel" slot="overlay">
                    <div class="n-user-info-basic">
                        <div class="n-user-info-avater">
                            <img :src="userInfo.avatar" alt="">
                        </div>
                        <div class="n-user-info-desc">
                            <div class="n-user-info-role">{{ userInfo.roleName }}</div>
                            <div class="n-user-info-name">{{ userInfo.userName }}</div>
                        </div>
                    </div>
                    <div class="n-user-menu-func">
                        <a-menu>
                            <a-menu-item key="logline" @click="toLogline"><a-icon type="calendar" />{{$t(dict.localeObj.personalCenter.frontendLog)}}</a-menu-item>
                            <a-menu-item key="customsetting"><a-icon type="setting" />{{$t(dict.localeObj.personalCenter.customSetting)}}</a-menu-item>
                        </a-menu>
                    </div>
                    <div class="n-user-menu-logout">
                        {{$t(dict.localeObj.personalCenter.logout)}}
                    </div>
                </div>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import dict from '@custom/dict'
    const NLangPicker = () => import('@corecp/NLangPicker.vue')

    export default Vue.extend({
        name: 'NHeader',
        computed: {
          ...mapGetters([
              'comConfig',
              'menuObj',
              'curMenu',
              'userInfo'
          ])
        },
        components: {
            NLangPicker
        },
        data () {
            return {
                dict
            }
        },
        methods: {
            ...mapActions([
               'changeCurMenu'
            ]),
            changeMenu ({key}: {key: any}) {
                const self = this as any
                self.changeCurMenu([key])
            },
            toLogline () {
                const self = this as any
                self.$newpage({
                    title: self.$t(dict.localeObj.personalCenter.frontendLog),
                    component: dict.commonObj.loglinePath
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/header.scss'
</style>
