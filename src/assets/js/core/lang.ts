import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import customerEnUS from '@js/locale/en_US'
import customerJaJP from '@js/locale/ja_JP'
import customerKoKR from '@js/locale/ko_KR'
import customerZhCN from '@js/locale/zh_CN'
import customerZhTW from '@js/locale/zh_TW'

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
        [enUS.locale]: customerEnUS,
        [jaJP.locale]: customerJaJP,
        [koKR.locale]: customerKoKR,
        [zhCN.locale]: customerZhCN,
        [zhTW.locale]: customerZhTW
    }
}

export default {
    globalLocaleObj,
    i18nOpt
}
