import VueI18n from 'vue-i18n'
import Vue from 'vue'
import {GlobalLocale, I18nOption} from '@corets/type'
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
