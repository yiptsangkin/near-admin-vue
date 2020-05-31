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
            <n-lang-picker></n-lang-picker>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    const NLangPicker = () => import('@corecp/NLangPicker.vue')

    export default Vue.extend({
        name: 'NHeader',
        computed: {
          ...mapGetters([
              'comConfig',
              'menuObj',
              'curMenu'
          ])
        },
        components: {
            NLangPicker
        },
        data () {
            return {
            }
        },
        methods: {
            ...mapActions([
               'changeCurMenu'
            ]),
            changeMenu ({key}: {key: any}) {
                const self = this
                self.changeCurMenu([key])
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/header.scss'
</style>
