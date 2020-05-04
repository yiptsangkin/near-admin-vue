import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import customEnUS from '@js/locale/en_US.ts'
import customJaJP from '@js/locale/ja_JP.ts'
import customKoKR from '@js/locale/ko_KR.ts'
import customZhCN from '@js/locale/zh_CN.ts'
import customZhTW from '@js/locale/zh_TW.ts'

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

interface GlobalLocale {
    [key: string]: any
}

interface I18nOption {
    locale: string,
    messages: any
}

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

export default {
    globalLocaleObj,
    i18nOpt
}
