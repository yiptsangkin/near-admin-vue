import Vue from 'vue'
import App from './App.vue'
import router from './router/manage'
import utils from '@ts/core/utils'
import store from '@store/index'
import VueI18n from 'vue-i18n'
import lang from '@ts/core/lang'

// antd component
import {
    Button,
    ConfigProvider,
    DatePicker
} from 'ant-design-vue'

// config
Vue.config.productionTip = false

// import antd
Vue.component(Button.name, Button)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(DatePicker.name, DatePicker)

// vue-i18n
Vue.use(VueI18n)
const i18n = new VueI18n(lang.i18nOpt)

router.beforeEach((to, from, next) => {
    const title = to.meta.title
    if (to.meta.title) {
        utils.setPageTitle(title)
    } else {
        utils.setPageTitle('')
    }
    next()
})

new Vue({
    render: (h) => h(App),
    store,
    router,
    i18n
}).$mount('#app')
