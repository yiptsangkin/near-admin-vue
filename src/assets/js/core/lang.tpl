<% importTpl %>

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

interface GlobalLocale {
    [key: string]: any
}

interface I18nOption {
    locale: string,
    messages: any
}

const globalLocaleObj: GlobalLocale = {
    <% exportAntdTpl %>
}

const i18nOpt: I18nOption = {
    locale: CACHE_LOCALE,
    messages: {
        <% exportCustomerTpl %>
    }
}

export default {
    globalLocaleObj,
    i18nOpt
}
