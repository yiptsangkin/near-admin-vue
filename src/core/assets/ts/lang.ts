import VueI18n from 'vue-i18n'
import Vue from 'vue'
import {GlobalLocale, I18nOption} from '@corets/type'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import customEnUS from '@locale/en_US.ts'
import customJaJP from '@locale/ja_JP.ts'
import customKoKR from '@locale/ko_KR.ts'
import customZhCN from '@locale/zh_CN.ts'
import customZhTW from '@locale/zh_TW.ts'

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

const globalLocaleObj: GlobalLocale = {
    [enUS.locale]: enUS,
    [jaJP.locale]: jaJP,
    [koKR.locale]: koKR,
    [zhCN.locale]: zhCN,
    [zhTW.locale]: zhTW
}

const i18nOpt: I18nOption = {
    locale: CACHE_LOCALE,
    messages: {
        [enUS.locale]: customEnUS,
        [jaJP.locale]: customJaJP,
        [koKR.locale]: customKoKR,
        [zhCN.locale]: customZhCN,
        [zhTW.locale]: customZhTW
    }
}

Vue.use(VueI18n)
const i18n = new VueI18n(i18nOpt)
const i18nObj = new Vue({
    i18n
})

export default i18n

export {
    i18nObj,
    globalLocaleObj
}
