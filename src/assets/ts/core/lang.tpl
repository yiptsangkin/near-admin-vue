import {GlobalLocale, I18nOption} from '@ts/core/type'
<% importTpl %>

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

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
