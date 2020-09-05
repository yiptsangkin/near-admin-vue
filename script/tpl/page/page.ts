import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@store/index'
import i18n from '@corets/lang'
import mock from '@mock/index'

// antd component
import {
    ConfigProvider,
    message,
    notification
} from 'ant-design-vue'
import comConfig from '@custom/config'
import utils from '@corets/utils'

// config
Vue.config.productionTip = false

// import antd component
Vue.component(ConfigProvider.name, ConfigProvider)

// import antd directive
Vue.prototype.$message = message
Vue.prototype.$notification = notification

// reset `$t` directive when isI18n switch is on
if (!comConfig.buildSwitch.isI18n) {
    Vue.prototype.$t = (str: string) => {
        return utils.getLocaleIfI18nOff(str)
    }
}

// mockjs
if (comConfig.buildSwitch.isMock) {
    Vue.use(mock as any)
}

new Vue({
    render: (h) => h(App),
    store,
    router,
    i18n
}).$mount('#app')
