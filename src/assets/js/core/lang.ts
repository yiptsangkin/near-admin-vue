import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import customerZhCN from '@js/locale/zh_CN'
import customerEnUs from '@js/locale/en_US'

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

interface GlobalLocaleChild {
    antdLocale: any
}

interface GlobalLocale {
    [key: string]: any
}

interface I18nOption {
    locale: string,
    messages: any
}

const zhCNObj: GlobalLocaleChild = {
    antdLocale: zhCN
}

const enUSObj: GlobalLocaleChild = {
    antdLocale: enUS
}

const globalLocaleObj: GlobalLocale = {
    [zhCN.locale]: zhCNObj,
    [enUS.locale]: enUSObj
}

const i18nOpt: I18nOption = {
    locale: CACHE_LOCALE,
    messages: {
        [zhCN.locale]: customerZhCN,
        [enUS.locale]: customerEnUs
    }
}

export default {
    globalLocaleObj,
    i18nOpt
}
