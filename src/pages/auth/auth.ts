import Vue from 'vue'
import App from './App.vue'
import router from './router/auth'
import utils from '@ts/core/utils'
import store from '@store/index'
import VueI18n from 'vue-i18n'
import lang from '@ts/core/lang'

// antd component
import {
    ConfigProvider,
    Row,
    Col
} from 'ant-design-vue'

// config
Vue.config.productionTip = false

// import antd
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(ConfigProvider.name, ConfigProvider)

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
